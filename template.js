exports.description = "A boilerplate template for backbone";
// Template-specific notes to be displayed before question prompts.
exports.notes = 'For more information about this template please contact' +
  'vjunloc@github or email at vijaytyagi.vt@gmail.com';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';


 exports.template = function( grunt, init, done ) {
 	
 	var join = require('path').join;

 	init.process({}, [

 		init.prompt("name"),
 		init.prompt("description"),
 		init.prompt("version"),
 		init.prompt("licenses", "MIT"),
 		init.prompt("author_name"),
 		init.prompt("author_url")

 	], function(err, props){

 		var destination = init.destpath(),
 			dirs = {},
 			files = init.filesToCopy(props),
 			truncatedPath;


 		for( var src in files ){

 			if( src.indexOf(".gitkeep") != -1 ){
 				dirs[src] = files[src];
 			}
 		}

 		files = grunt.util._.omit(files, grunt.util._.keys(dirs) );


 		/* creating empty directories */
 		for( var src in dirs ){
 			
 			truncatedPath = dirs[src].replace(/bb-boilerplate\/root|\/.gitkeep/g, "");

 			grunt.file.mkdir(join(destination, truncatedPath));
 			grunt.verbose.or.write("Writing " + truncatedPath.replace(/\//, "") + "..." );
 			grunt.verbose.or.ok();
 			
 		}



 		init.addLicenseFiles(files, props.licenses);

 		init.copyAndProcess(files, props);

 		init.writePackageJSON("package.json", {

 			name : props.name,
 			version : props.version,
 			description : props.description,
 			author : {
 				name : props.author_name,
 				url : props.author_url
 			},
 			devDependencies: {
 				'grunt' : 'latest'
 			}

 		});

 		done();

 	});

 	
 };