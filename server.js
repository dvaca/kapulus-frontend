//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/registro-eventos'));
app.use("/", express.static(__dirname+'/dist'));
app.use("/callcenter_token_7D5H3N9Y4F", express.static(__dirname+'/dist'));
app.use("/callcenter_token_4B5O2S8Z0L", express.static(__dirname+'/dist'));
app.use("/callcenter_token_1T9Y7X1M9A", express.static(__dirname+'/dist'));
app.use("/callcenter_token_9B0I4J8R2T", express.static(__dirname+'/dist'));
app.use("/callcenter_token_6J2N4P6Q3K", express.static(__dirname+'/dist'));
app.use("/callcenter_token_3N8P3H6V1L", express.static(__dirname+'/dist'));
app.use("/registro-plus-superior", express.static(__dirname+'/dist'));
app.use("/registro-foros-semana", express.static(__dirname+'/dist'));
app.use("/registro-coosalud-bucaramanga", express.static(__dirname+'/dist'));
app.use("/registro-autonomia-medica", express.static(__dirname+'/dist'));
//app.use("/registro-foro-columnistas", express.static(__dirname+'/dist'));
app.use("/registro-foro-mujeres", express.static(__dirname+'/dist'));
app.use("/registro-coosalud-cali", express.static(__dirname+'/dist'));
app.use("/registro-coosalud-bogota", express.static(__dirname+'/dist'));
app.use("/registro-rio-bogota", express.static(__dirname+'/dist'));
app.use("/registro-prosegur", express.static(__dirname+'/dist'));

app.use("/callcenter_registro_cerveza", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_orquideas", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_cerveza", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_orquideas", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_semana", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_semana", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_cartagena", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_cartagena", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_coosalud", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_coosalud", express.static(__dirname+'/dist'));

app.use("/callcenter_registro_coosalud_bquilla", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_coosalud_bmanga", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_autonomia_medica", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_columnistas", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_coosalud_medellin", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_mujeres", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_coosalud_cali", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_movilidad", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_contraloria", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_coosalud_bogota", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_rio_bogota", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_oracle", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_ied", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_prosegur", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_seloquecomo", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_copnia", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_juegos", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_sostenibilidad", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_feoracle", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_feoracle2", express.static(__dirname+'/dist'));
app.use("/callcenter_registro_planeacion_policia", express.static(__dirname+'/dist'));

app.use("/callcenter_estadisticas_coosalud_bquilla", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_coosalud_bmanga", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_autonomia_medica", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_columnistas", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_coosalud_medellin", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_mujeres", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_coosalud_cali", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_movilidad", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_contraloria", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_coosalud_bogota", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_rio_bogota", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_oracle", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_ied", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_prosegur", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_seloquecomo", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_copnia", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_juegos", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_sostenibilidad", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_feoracle", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_feoracle2", express.static(__dirname+'/dist'));
app.use("/callcenter_estadisticas_planeacion_policia", express.static(__dirname+'/dist'));

app.use("/evento_estadisticas_semana", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_coosalud", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_coosalud_medellin", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_coosalud_bmanga", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_columnistas", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_mujeres", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_desayuno", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_movilidad", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_contraloria", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_coosalud_bogota", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_rio_bogota", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_autonomia_medica", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_coosalud_cali", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_mujeres", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_digital_now", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_defensoria", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_ied", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_seloquecomo", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_bvc", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_usaid", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_juegos", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_sostenibilidad", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_copnia", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_feoracle", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_cima", express.static(__dirname+'/dist'));
app.use("/evento_estadisticas_bvc_cali", express.static(__dirname+'/dist'));

app.use("/certificado_asistencia_copnia", express.static(__dirname+'/dist'));

//app.get('/*', function(req,res) {
    
//res.sendFile(path.join(__dirname+'/dist/index.html'));
//});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
