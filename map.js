// @formatter:off
var mapMain;
var clickpoint;
require([
        "esri/map",
        "esri/layers/FeatureLayer",
        "esri/tasks/ServiceAreaTask", 
        "esri/tasks/ServiceAreaParameters", 
        "esri/tasks/FeatureSet",
        "esri/graphic",
        "esri/tasks/query",
        


        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/Color",
        "esri/geometry/Point",

        "esri/renderers/SimpleRenderer",
        "esri/renderers/ClassBreaksRenderer",
        "esri/layers/LayerDrawingOptions",

        "dojo/ready",
        "dojo/parser",
        "dojo/on",
        "dojo/dom",


        "dojo/_base/declare",
        "dojo/_base/array",

        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/form/Button"],
    function (Map,FeatureLayer, ServiceAreaTask, ServiceAreaParameters, FeatureSet, Graphic, Query, 
              SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color, Point,
              SimpleRenderer, ClassBreaksRenderer, LayerDrawingOptions,
              ready, parser, on, dom,
              declare, array,
              BorderContainer, ContentPane, Button) {

        ready(function () {


            parser.parse();

            var madrid = "https://services5.arcgis.com/zZdalPw2d0tQx8G1/arcgis/rest/services/CENTROS_SALUD_j/FeatureServer/0";
            
            mapMain = new Map("divMap", {
                basemap: "topo",
                center: [-3.64, 40.39],
                zoom: 12
            });


           
            var capa = new FeatureLayer(madrid, {
                outFields: ["*"]

            });
            mapMain.addLayer(capa);

            var params = new ServiceAreaParameters();
            console.log('param', params)
            var grafico = new Graphic(capa)
            var features = [];
            features.push(grafico);
            var centrosSalud = new FeatureSet();
            centrosSalud.features = features;
            params.facilities = centrosSalud;
            params.defaultBreaks = [3];
            params.outSpatialReference = mapMain.spatialReference;
            params.impedanceAttribute = "DistanciaAndando"

            var consulta = new Query()
            consulta.where = "1=1"
            consulta.outFields = ["*"]
            consulta.returnGeometry = "true"
            console.log('consulta', consulta)


            var areaServicio = new ServiceAreaTask("https://formacion.esri.es/server/rest/services/RedMadrid/NAServer/Service%20Area")
        });
    });
