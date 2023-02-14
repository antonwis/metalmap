<template>
  <div>
      <div id='mapid'></div>
      <Sidebar
      :active="active"
      :population="population"
      :country="country"
      @side-active="sideActive"
      @open-details="bandDetails"
      
      />
      <BandInfo
      :activeModal="activeModal"
      :band="band"
      @modal-active="closeModal"
    />
    </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import borderData from "~/assets/geoLow.json"
const { $L : L } = useNuxtApp();

const emit = defineEmits(["details"]);

const geojson = ref(null);
    const mapDiv = ref(null);
    const borders = ref(borderData); // border data
    const active = ref(false);
    const band = ref(null);
    const activeModal = ref(false);
    const population = ref(0);
    const country = ref("");
    const bounds = ref(null);
   

const setStyle = () => {
      return {
        fillColor: "#000000", //fill color (obv)
        weight: 1, // border paksuus
        opacity: 1, // border opacity 0-1
        color: "green", //border fill color
        dashArray: "", // border viivoja
        fillOpacity: 0.3 // fill opacity (lol) 0-1
      };
    };

    const highlightFeature = (e) => {
      const layer = e.target;
      !active.value
        ? layer.setStyle({
            fillColor: "#ffffff", //fill color (obv)
            color: "#ffffff",
            dashArray: "",
            fillOpacity: 0.15
          })
        : null;
    };
    const resetHighlight = (e) => {
      !active.value ? geojson.value.resetStyle(e.target) : null;
    };
    const zoomToFeature = (e) => {
      geojson.value.resetStyle();
      mapDiv.value.fitBounds(e.target.getBounds());
      active.value = true;
      population.value = e.target.feature.properties.pop_est;
      country.value = e.target.feature.properties.name;
      const layer = e.target;
      layer.setStyle({
        fillColor: "#ffffff",
        color: "#ffffff",
        dashArray: "",
        fillOpacity: 0.25
      });
    };
    const onEachFeature = (feature, layer) => {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
      });
    };

const initMap = () => {
      mapDiv.value = L.map('mapid', {
        maxBounds: bounds.value,
        maxBoundsViscosity: 1.0,
        zoomControl: false
      }).setView(L.latLng(60.15568, 24.95535), 8);
      L.control.zoom({ position: "bottomright" }).addTo(mapDiv.value);
      L.tileLayer(
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png", 
        {
          attribution:
            "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors", 
          maxZoom: 6,
          minZoom: 4 
        }
      ).addTo(mapDiv.value);
      geojson.value = L.geoJSON(borders.value, {
        style: setStyle, 
        onEachFeature: onEachFeature
      }).addTo(mapDiv.value);
    };

    const sideActive = () => {
      active.value = false;
      geojson.value.resetStyle();
    };
    const bandDetails = (x) => {
      activeModal.value = true;
      band.value = x;
    };
    const closeModal = () => {
      activeModal.value = false;
    };

    onMounted(() => {
      bounds.value = ref(new L.LatLngBounds(new L.LatLng(-60, -181),  new L.LatLng(90, 181))); 
      initMap();
     })



</script>

<style scoped>
#mapid {
    height: calc(100%);
    width: 100%;
    position: absolute;
    z-index: 1;
}
</style>