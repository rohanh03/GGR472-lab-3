// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9oYW4yMDAzIiwiYSI6ImNtazRrYTVtMDA4OTEzbW91YTBtOHhxczEifQ.ZVzMbtIQ2tihbIcpSl3fmQ';

// Map initialization
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [72.868, 19.065],   // centered over Mumbai
    zoom: 10.59
});

// Add zoom + compass control (top-right)
map.addControl(new mapboxgl.NavigationControl(), 'top-right');

// Data definitions below

// POI categories with their display color
const CATEGORIES = {
    Heritage: '#E74C3C',
    Market: '#F39C12',
    Nature: '#27AE60',
    Beach: '#2980B9',
    Temple: '#8E44AD'
};

// POI_DATA is defined in mumbai-poi.js (loaded via <script> tag in index.html)

// Routes reused from Lab 2, published links instead of using raw ones
const ROUTES = [
    {
        id: 'route-sgnp-mcaves',
        label: 'SGNP -> Mahim Caves',
        color: '#C94122',
        url: 'https://rohanh03.github.io/GGR472-lab-2/data/sgnp_to_mcaves.geojson'
    },
    {
        id: 'route-mcaves-svtemple',
        label: 'Mahim Caves -> SV Temple',
        color: '#57C922',
        url: 'https://rohanh03.github.io/GGR472-lab-2/data/mcaves_to_svtemple.geojson'
    },
    {
        id: 'route-svtemple-wfort',
        label: 'SV Temple -> Worli Fort',
        color: '#22AAC9',
        url: 'https://rohanh03.github.io/GGR472-lab-2/data/svtemple_to_wfort.geojson'
    },
    {
        id: 'route-wfort-goi',
        label: 'Worli Fort -> GOI',
        color: '#9422C9',
        url: 'https://rohanh03.github.io/GGR472-lab-2/data/wfort_to_goi.geojson'
    }
];

// Load all map sources and layers on map ready
map.on('load', () => {

    // 1. Route sources + layers 
    ROUTES.forEach(route => {
        // One source per route GeoJSON
        map.addSource(route.id, {
            type: 'geojson',
            data: route.url
        });

        // Line layer
        map.addLayer({
            id: route.id,
            type: 'line',
            source: route.id,
            paint: {
                'line-color': route.color,
                'line-width': 3,
                'line-opacity': 0.85
            }
        });
    });

    // 2. POI source 
    // Data is the inlined JS object
    // generateId: true assigns numeric IDs needed for hover feature (circles expand on hover)
    map.addSource('mumbai-poi', {
        type: 'geojson',
        data: POI_DATA,
        generateId: true
    });

    // 3. POI circle layer 
    map.addLayer({
        id: 'poi-circles',
        type: 'circle',
        source: 'mumbai-poi',
        paint: {
            // Classified colour: one colour per category
            'circle-color': [
                'match', ['get', 'category'],
                'Heritage', CATEGORIES.Heritage,
                'Market', CATEGORIES.Market,
                'Nature', CATEGORIES.Nature,
                'Beach', CATEGORIES.Beach,
                'Temple', CATEGORIES.Temple,
                '#999'      // fallback 
            ],

            // Radius grows with zoom and enlarges on hover (feature-state)
            'circle-radius': [
                'interpolate', ['linear'], ['zoom'], // Adds smoothing to radius changes as user zooms in/out
                10, ['case', ['boolean', ['feature-state', 'hover'], false], 9, 6], // Interpolation occurs between zoom levels of 10 and 15
                15, ['case', ['boolean', ['feature-state', 'hover'], false], 13, 10]
            ],

            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#fff'
        }
    });

    // 4. Popup on click 
    const popup = new mapboxgl.Popup({ offset: 12, closeButton: true });

    map.on('click', 'poi-circles', (e) => {
        const props = e.features[0].properties; // Properties of feature clicked
        const color = CATEGORIES[props.category] || '#999';

        // Build popup HTML: category badge + name + description
        const html = `
            <div class="popup-content">
                <span class="popup-category" style="background:${color}">${props.category}</span>
                <h3>${props.name}</h3>
                <p>${props.description}</p>
            </div>`;

        popup // Making sure pop-up appears above feature coordinates
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(html)
            .addTo(map);
    });

    // 5. Hover effects 
    let hoveredId = null;   // Track which feature is currently hovered

    map.on('mousemove', 'poi-circles', (e) => {
        map.getCanvas().style.cursor = 'pointer';

        const featureId = e.features[0].id;
        if (featureId === hoveredId) return; // Already hovering this feature

        // Clear previous hover state
        if (hoveredId !== null) {
            map.setFeatureState(
                { source: 'mumbai-poi', id: hoveredId },
                { hover: false }
            );
        }
        hoveredId = featureId;
        // Set hover state -> triggers circle-radius case expression above
        map.setFeatureState(
            { source: 'mumbai-poi', id: hoveredId },
            { hover: true }
        );
    });
    // Clear hover state
    map.on('mouseleave', 'poi-circles', () => {
        map.getCanvas().style.cursor = '';
        if (hoveredId !== null) {
            map.setFeatureState(
                { source: 'mumbai-poi', id: hoveredId },
                { hover: false }
            );
        }
        hoveredId = null;
    });

    // 6. Build filter panel (checkboxes also serve as the legend via swatches)
    buildPoiFilters();
    buildRouteFilters();
});

//  Filter panel: POI categories
function buildPoiFilters() {
    const container = document.getElementById('poi-filters');

    // Start with all categories checked
    const checkedCategories = new Set(Object.keys(CATEGORIES));

    Object.entries(CATEGORIES).forEach(([category, color]) => {
        const label = document.createElement('label');
        label.className = 'filter-row';

        label.innerHTML = `
            <input type="checkbox" value="${category}" checked>
            <span class="swatch-circle" style="background:${color}"></span>
            ${category}`;

        container.appendChild(label);

        // On toggle, recalculate which categories are visible and update filter
        label.querySelector('input').addEventListener('change', () => {
            if (label.querySelector('input').checked) {
                checkedCategories.add(category);
            } else {
                checkedCategories.delete(category);
            }
            applyPoiFilter(checkedCategories);
        });
    });
}

// Update poi-circles layer filter to show only checked categories
function applyPoiFilter(checkedSet) {
    const visible = [...checkedSet];
    // 'in' expression: keep feature if its category is in the visible array
    map.setFilter('poi-circles', ['in', ['get', 'category'], ['literal', visible]]);
}

// Filter panel: Routes, similar logic to POI categories except for applying the filter on a specific category to show/hide that category
function buildRouteFilters() {
    const container = document.getElementById('route-filters');

    ROUTES.forEach(route => {
        const label = document.createElement('label');
        label.className = 'filter-row';

        label.innerHTML = `
            <input type="checkbox" value="${route.id}" checked>
            <span class="swatch-line" style="background:${route.color}"></span>
            ${route.label}`;

        container.appendChild(label);

        // Toggle layer visibility when checkbox changes
        label.querySelector('input').addEventListener('change', (e) => {
            const visibility = e.target.checked ? 'visible' : 'none';
            map.setLayoutProperty(route.id, 'visibility', visibility);
        });
    });
}


