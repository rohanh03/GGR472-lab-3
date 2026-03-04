// POI GeoJSON data — kept in a separate file to avoid cluttering script.js.
// Loaded via <script> tag so it works when opening index.html
// 10 POIs total: 2 per category. The 5 route endpoints are marked with *.
const POI_DATA = {
    type: 'FeatureCollection',
    features: [

        // Heritage
        {
            type: 'Feature',
            properties: {
                name: 'Gateway of India',           // * end of route 4
                category: 'Heritage',
                description: 'Iconic arch monument built during the British Raj, overlooking Mumbai Harbour.'
            },
            geometry: { type: 'Point', coordinates: [72.8338, 18.9234] }
        },
        {
            type: 'Feature',
            properties: {
                name: 'Worli Fort',                 // * end of route 3
                category: 'Heritage',
                description: 'Ancient Portuguese fort on the Worli peninsula, with panoramic views of the Bandra-Worli Sea Link.'
            },
            geometry: { type: 'Point', coordinates: [72.8175, 19.0219] }
        },

        // Market
        {
            type: 'Feature',
            properties: {
                name: 'Crawford Market',
                category: 'Market',
                description: 'Historic wholesale market for fruits, vegetables, and spices in a Norman-Gothic style building.'
            },
            geometry: { type: 'Point', coordinates: [72.8356, 18.9483] }
        },
        {
            type: 'Feature',
            properties: {
                name: 'Chor Bazaar',
                category: 'Market',
                description: "Mumbai's famous antique market, also known as Thieves Market, selling vintage goods and curiosities."
            },
            geometry: { type: 'Point', coordinates: [72.8275, 18.9614] }
        },

        // Nature
        {
            type: 'Feature',
            properties: {
                name: 'Sanjay Gandhi National Park', // * start of route 1
                category: 'Nature',
                description: 'Large protected forest within city limits, home to leopards and the ancient Kanheri Caves.'
            },
            geometry: { type: 'Point', coordinates: [72.8639, 19.2315] }
        },
        {
            type: 'Feature',
            properties: {
                name: 'Mahim Caves',                // * end of route 1
                category: 'Nature',
                description: 'Ancient Buddhist rock-cut caves dating to the 2nd century BCE, among the oldest rock-cut monuments in Maharashtra.'
            },
            geometry: { type: 'Point', coordinates: [72.8730, 19.1302] }
        },

        // Beach
        {
            type: 'Feature',
            properties: {
                name: 'Juhu Beach',
                category: 'Beach',
                description: 'Popular suburban beach famous for its evening food stalls, pav bhaji, and panoramic sunset views.'
            },
            geometry: { type: 'Point', coordinates: [72.8270, 19.0990] }
        },
        {
            type: 'Feature',
            properties: {
                name: 'Marine Drive',
                category: 'Beach',
                description: "C-shaped seafront promenade along the Arabian Sea, nicknamed the Queen's Necklace for its arc of street lights."
            },
            geometry: { type: 'Point', coordinates: [72.8231, 18.9437] }
        },

        // Temple
        {
            type: 'Feature',
            properties: {
                name: 'Siddhivinayak Temple',       // * end of route 2
                category: 'Temple',
                description: 'Revered Hindu temple dedicated to Lord Ganesha, one of the richest and most visited temples in Mumbai.'
            },
            geometry: { type: 'Point', coordinates: [72.8298, 19.0167] }
        },
        {
            type: 'Feature',
            properties: {
                name: 'Mahalakshmi Temple',
                category: 'Temple',
                description: 'Coastal temple dedicated to Mahalakshmi, Mahakali, and Mahasaraswati, perched above the Arabian Sea.'
            },
            geometry: { type: 'Point', coordinates: [72.8339, 18.9808] }
        }

    ]
};
