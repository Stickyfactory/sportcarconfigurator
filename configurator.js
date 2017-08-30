"use strict";

var app = b4w.require("app");
var data = b4w.require("data");
var scene = b4w.require("scenes");
var cam = b4w.require("camera");
var material = b4w.require("material");
var rgba = b4w.require("rgba");
var rgb = b4w.require("rgb");
var obj = b4w.require("objects");
var light = b4w.require("lights");
var cam_ani = b4w.require("camera_anim");
var ss = b4w.require("screen");

var scocca;
var rim1;
var rim2;
var rim3;
var rim4;
var rim_original1;
var rim_original2;
var rim_original3;
var rim_original4;
var lights_on1;
var lights_on2;
var lights_on3;
var rear_light1;
var rear_light2;
var rear_light3;
var h_color;
var z_color;
var obj_light;
var brake1;
var brake2;
var brake3;
var brake4;
var a_brake;
var lights_ground;
var light_targa;

var objSatinBlack;
var objCarbon;
var rim1_copy;
var limit;
var p_limit;


var TARGET_VERT_LIMITS = {
    down: -Math.PI/100, 
    up: -Math.PI/2
}

var TARGET_POS = new Float32Array([1.5, -2, 0]);
var TARGET_PIVOT = new Float32Array([1.5, 0, 0]);

app.init({
	canvas_container_id: "container_id",
	physics_enabled: false,
	autoresize: true,
	callback: load_cb
});


function load_cb(){
	data.load(document.URL+"configuratore.json", loaded_cb, preloader_cb);
}

function preloader_cb(percentage) {
    
    var percantage_num = document.getElementById("num");
    percantage_num.innerHTML = percentage + "%";	   
    if (percentage == 100) {
        $('#preload').fadeOut(500, function(){
        	setTimeout(function(){ 
        		$('.popup').fadeIn();
            },
        	500);        	
        })
        return;
    }
}

function loaded_cb(){
	app.enable_camera_controls();

	limit = {min:7, max:30};
	p_limit = {min_z:0, max_z:4};
	var camera = scene.get_active_camera();

    cam.target_setup(camera, { pos: TARGET_POS, pivot: TARGET_PIVOT, vert_rot_lim: TARGET_VERT_LIMITS, use_panning: true });
    // setting some rotation
    cam.rotate_camera(camera, Math.PI/8, 0, true, true); 
    cam.target_set_distance_limits(camera, limit);
    cam.target_set_pivot_limits(camera, p_limit);

    cam_ani.auto_rotate(0.2, endRotation, true);
    
    //initial object 	
	scocca = scene.get_object_by_name('carrozzeria');

	objSatinBlack = scene.get_object_by_name('obj_satin_black');

	objCarbon = scene.get_object_by_name('oggetti_carbonio');

	rim1 = scene.get_object_by_name('rim_1');
	rim2 = scene.get_object_by_name('rim_2');
	rim3 = scene.get_object_by_name('rim_3');
	rim4 = scene.get_object_by_name('rim_4');

	rim1_copy = obj.copy(rim1, 'rim1_copy');

	rim_original1 = scene.get_object_by_name('rim_original_1');
	rim_original2 = scene.get_object_by_name('rim_original_2');
	rim_original3 = scene.get_object_by_name('rim_original_3');
	rim_original4 = scene.get_object_by_name('rim_original_4');

	//luci
	lights_on1 = scene.get_object_by_name('lights_on');
	lights_on2 = scene.get_object_by_name('light_1');
	lights_on3 = scene.get_object_by_name('light_2');
	rear_light1 = scene.get_object_by_name('rear_light1');
	rear_light2 = scene.get_object_by_name('rear_light2');
	rear_light3 = scene.get_object_by_name('rear_light3');
	light_targa = scene.get_object_by_name('light_targa');
	scene.hide_object(lights_on1);
	scene.hide_object(lights_on2);
	scene.hide_object(lights_on3);	
	scene.hide_object(rear_light1);	
	scene.hide_object(rear_light2);	
	scene.hide_object(rear_light3);
	scene.hide_object(light_targa);	

	//freni
	brake1 = scene.get_object_by_name('brake_1');
	brake2 = scene.get_object_by_name('brake_2');
	brake3 = scene.get_object_by_name('brake_3');
	brake4 = scene.get_object_by_name('brake_4');
	a_brake = [brake1, brake2, brake3, brake4];

	lights_ground = scene.get_object_by_name('lights_ground');

	obj_light = scene.get_object_by_name('Hemi');
    cam.target_zoom_object(camera, scocca);    

}

function endRotation(){
	return;
}

$(document).ready(function(){

	$('#esterni .giallo-modena,#esterni-m .giallo-modena').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 0.982, 0.61, 0);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0.890, 0.679, 0.179);
	});

	$('#esterni .rosso-scuderia,#esterni-m .rosso-scuderia').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 1, 0.021, 0);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0.982, 0.485, 0.539);
	});

	$('#esterni .rosso-corsa,#esterni-m .rosso-corsa').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 0.571, 0.017, 0.018);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0.815, 0.552, 0.578);
	});

	$('#esterni .rosso-mugello,#esterni-m .rosso-mugello').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 0.133, 0.013, 0.017);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0.356, 0.003, 0.012);
	});

	$('#esterni .bianco-avus,#esterni-m .bianco-avus').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 0.823, 0.791, 0.768);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0, 0, 0);
	});

	$('#esterni .nero,#esterni-m .nero').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 0.007, 0.007, 0.008);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0.3, 0.3, 0.3);
	});

	$('#esterni .blu-pozzi,#esterni-m .blu-pozzi').click(function(){
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_base"], 0.010, 0.012, 0.019);
		material.set_nodemat_rgb(scocca, ["ferrari_red", "rgb_spec"], 0.052, 0.100, 0.233);
	});

	var count = 0;
	$("#luci").click(function(){
		if(count%2==0){
			//si spegne
			$(this).children("img").attr("src","img/light_off.png");
			scene.show_object(lights_on1);
			scene.show_object(lights_on2);
			scene.show_object(lights_on3);
			scene.show_object(lights_ground);
			scene.show_object(rear_light1);	
			scene.show_object(rear_light2);	
			scene.show_object(rear_light3);
			scene.show_object(light_targa);	
			h_color = rgb.from_values(0,0,0);
			z_color = rgb.from_values(0.015,0.015,0.015);
			scene.set_environment_colors(1, h_color,z_color);
			light.set_light_energy(obj_light,0.03);
			$('.popcircle ul li span').addClass('lon');
			$('#photo').css({'background' : 'url(img/camera-hover.png) no-repeat center'});
			$('.info-icon').css({'background' : 'url(img/info-icon-hover.png) no-repeat center'});
		}else{
			//si accende
			$(this).children("img").attr("src","img/light_on.png");
			scene.hide_object(lights_on1);
			scene.hide_object(lights_on2);
			scene.hide_object(lights_on3);
			scene.hide_object(rear_light1);	
			scene.hide_object(rear_light2);	
			scene.hide_object(lights_ground);
			scene.hide_object(light_targa);	
			scene.hide_object(rear_light3);
			h_color = rgb.from_values(1,1,1);
			z_color = rgb.from_values(0.580,0.580,0.580);
			scene.set_environment_colors(1, h_color,z_color);
			light.set_light_energy(obj_light,1);
			$('.popcircle ul li span').removeClass('lon');
			$('#photo').css({'background' : 'url(img/camera.png) no-repeat center'});
			$('.info-icon').css({'background' : 'url(img/info-icon.png) no-repeat center'});
		}
		count++;
	});

	//luci mobile
	var count_m = 0;
	$(".light-m").click(function(){
		if(count_m%2==0){
			//si spegne
			$(this).removeClass("light-on").addClass("light-off");
			scene.show_object(lights_on1);
			scene.show_object(lights_on2);
			scene.show_object(lights_on3);
			scene.show_object(lights_ground);
			scene.show_object(rear_light1);	
			scene.show_object(rear_light2);	
			scene.show_object(rear_light3);
			scene.show_object(light_targa);	
			h_color = rgb.from_values(0,0,0);
			z_color = rgb.from_values(0.015,0.015,0.015);
			scene.set_environment_colors(1, h_color,z_color);
			light.set_light_energy(obj_light,0.03);
			$('#photo').css({'background' : 'url(img/camera-hover.png) no-repeat center'});
			$('.menuMobile').css({'background' : 'url(img/menu-mobile-w.png) no-repeat center'});
			
		}else{
			//si accende
			$(this).removeClass("light-off").addClass("light-on");
			scene.hide_object(lights_on1);
			scene.hide_object(lights_on2);
			scene.hide_object(lights_on3);
			scene.hide_object(rear_light1);	
			scene.hide_object(rear_light2);	
			scene.hide_object(lights_ground);
			scene.hide_object(light_targa);	
			scene.hide_object(rear_light3);
			h_color = rgb.from_values(1,1,1);
			z_color = rgb.from_values(0.580,0.580,0.580);
			scene.set_environment_colors(1, h_color,z_color);
			light.set_light_energy(obj_light,1);
			$('#photo').css({'background' : 'url(img/camera.png) no-repeat center'});
			$('.menuMobile').css({'background' : 'url(img/menu-mobile.png) no-repeat center'});
		}
		count_m++;
	});

	$('#rim-original,#rim-original-m').click(function(){
		$('.submenu_rim1,.submenu_rim1-m').hide();
		$('.submenu_rim_original,.submenu_rim_original-m').slideToggle('fast', function(){
			centerPoints('submenu_rim_original');
		});
		scene.hide_object(rim1);
		scene.hide_object(rim2);
		scene.hide_object(rim3);
		scene.hide_object(rim4);
		
		scene.show_object(rim_original1);
		scene.show_object(rim_original2);
		scene.show_object(rim_original3);
		scene.show_object(rim_original4);

	});

	$('#rim-1,#rim-1-m').click(function(){
		$('.submenu_rim_original,.submenu_rim_original-m').hide();
		$('.submenu_rim1,.submenu_rim1-m').slideToggle('fast', function(){
			centerPoints('submenu_rim1');
		});

		scene.hide_object(rim_original1);
		scene.hide_object(rim_original2);
		scene.hide_object(rim_original3);
		scene.hide_object(rim_original4);
		
		scene.show_object(rim1);
		scene.show_object(rim2);
		scene.show_object(rim3);
		scene.show_object(rim4);
	});

	$('#satinato-nero,#satinato-nero-m').click(function(){
		material.inherit_material(objSatinBlack, 'rim_Black', rim1, 'rim_satin');
		material.inherit_material(objSatinBlack, 'rim_Black', rim2, 'rim_satin');
		material.inherit_material(objSatinBlack, 'rim_Black', rim3, 'rim_satin');
		material.inherit_material(objSatinBlack, 'rim_Black', rim4, 'rim_satin');
	});

	$('#c-carbonio,#c-carbonio-m').click(function(){
		material.inherit_material(objCarbon, 'Carbonio', rim1, 'rim_satin');
		material.inherit_material(objCarbon, 'Carbonio', rim2, 'rim_satin');
		material.inherit_material(objCarbon, 'Carbonio', rim3, 'rim_satin');
		material.inherit_material(objCarbon, 'Carbonio', rim4, 'rim_satin');
	});

	$('#satinato-grigio,#satinato-grigio-m').click(function(){
		material.inherit_material(rim1_copy, 'rim_satin', rim1, 'rim_satin');
		material.inherit_material(rim1_copy, 'rim_satin', rim2, 'rim_satin');
		material.inherit_material(rim1_copy, 'rim_satin', rim3, 'rim_satin');
		material.inherit_material(rim1_copy, 'rim_satin', rim4, 'rim_satin');
	});

	$('#satinato-nero2,#satinato-nero2-m').click(function(){
		material.inherit_material(objSatinBlack, 'rim_Black', rim_original1, 'rim_satin');
		material.inherit_material(objSatinBlack, 'rim_Black', rim_original2, 'rim_satin');
		material.inherit_material(objSatinBlack, 'rim_Black', rim_original3, 'rim_satin');
		material.inherit_material(objSatinBlack, 'rim_Black', rim_original4, 'rim_satin');
	});

	$('#c-carbonio2,#c-carbonio2-m').click(function(){
		material.inherit_material(objCarbon, 'Carbonio', rim_original1, 'rim_satin');
		material.inherit_material(objCarbon, 'Carbonio', rim_original2, 'rim_satin');
		material.inherit_material(objCarbon, 'Carbonio', rim_original3, 'rim_satin');
		material.inherit_material(objCarbon, 'Carbonio', rim_original4, 'rim_satin');
	});

	$('#satinato-grigio2,#satinato-grigio2-m').click(function(){
		material.inherit_material(rim1_copy, 'rim_satin', rim_original1, 'rim_satin');
		material.inherit_material(rim1_copy, 'rim_satin', rim_original2, 'rim_satin');
		material.inherit_material(rim1_copy, 'rim_satin', rim_original3, 'rim_satin');
		material.inherit_material(rim1_copy, 'rim_satin', rim_original4, 'rim_satin');
	});

	$('#pinze .giallo-modena,#pinze-m .giallo-modena').click(function(){
	
		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 0.982, 0.61, 0);
		}
	});

	$('#pinze .rosso-scuderia,#pinze-m .rosso-scuderia').click(function(){

		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 1, 0.021, 0);
		}
	
	});

	$('#pinze .rosso-corsa,#pinze-m .rosso-corsa').click(function(){

		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 0.571, 0.017, 0.018);
		}
	
	});

	$('#pinze .rosso-mugello,#pinze-m .rosso-mugello').click(function(){

		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 0.133, 0.013, 0.017);
		}
		
	});

	$('#pinze .bianco-avus,#pinze-m .bianco-avus').click(function(){

		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 0.823, 0.791, 0.768);
		}
	
	});

	$('#pinze .nero,#pinze-m .nero').click(function(){

		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 0.007, 0.007, 0.008);
		}
		
	});

	$('#pinze .blu-pozzi,#pinze-m .blu-pozzi').click(function(){

		for(var i=1; i<5; i++){
			material.set_nodemat_rgb(a_brake[i-1], ["brake", "rgb_base"], 0.010, 0.012, 0.019);
		}
	
	});

	$('#photo').click(function(){

		ss.shot();

	});

});


