export const crearMapa = () => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmF4YWxzb2wiLCJhIjoiY2toM24xbTZiMDNpeTJ6cWI1ZTlmaDgxZiJ9.tBaVmgkNIOiityXw_q6cLg';  
    var coord =  [-59.821098,-34.378299];
    var map = new mapboxgl.Map({ 
        container: "maps", 
        style: 'mapbox://styles/mapbox/streets-v9',  
        center: coord,
        zoom: 12
    }); 
    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));    
    new mapboxgl.Marker().setLngLat(coord).addTo(map);        
}