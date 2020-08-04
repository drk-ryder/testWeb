
const { Validator } = require('node-input-validator');
const fs = require('fs');
// const fileUpload = require('express-fileupload');

exports.login = (req, res) => {
	// console.log('Submit Function');
	// console.log(req.body);

 const v = new Validator(req.body, {
    email: 'required|email',
    password: 'required'
  });

	v.check().then((matched) => {
    if (!matched) {
    	console.log(v.errors);
      res.status(422).send(v.errors);
    }else{
    	var data=req.body;
    	console.log(v.email);
   		req.session.email = data.email;
		req.session.password = data.password;

    	// console.log('validation passed');
    	let query = "SELECT * FROM `admin` WHERE email='"+req.session.email+"' AND password='"+req.session.password+"'  "; // query database to get all the players
    	// console.log(query);
    // execute query
    db.query(query, (err, result) => {
    	if(err)
    	{
    		console.log(err);
    	}else{
    		if(result!=null && result!='' && result!=undefined)
    		{
    			console.log("You have logged in Successfully");
    			res.redirect('dashboard');
    		}else{
    			console.log("Please check your email and password");
    			res.redirect('404');
    		}
    		// console.log(result);
    	}
    });
   }
  });

};


// ------ add category --- POST Function

exports.addCategories = (req, res)  => {

	if(req.session.email)
	{
		console.log('Add Post.add-Category');
		// res.sendFile(__dirname + '/add-category');
    	console.log('\nTesting file upload get function');
    	var data = req.body;
		console.log(data);
		var file=req.files.file;
		console.log('files',file);
		var filename=file.name;
		
		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
                                 
              file.mv('./public/assets/img/'+filename, (err)=> {
                             
	              if(err){ 
	                console.log("Please try again.");
	            }else{
	            	console.log("\nTrying to upload the file to Database");
	            	let insertquery = "INSERT INTO `cat_image`(`category`,`image`) VALUES ('" + data.category_name + "','" + filename + "')";

	            	db.query(insertquery, (err, result) => {
    	if(err)
    	{
    		console.log(err);
    	}else{
    		console.log('result\n', result);
    		if(result!=null && result!='' && result!=undefined)
    		{
    			console.log("\nFile uploaded Successfully");
    			res.redirect('back');
    		}else{
    			console.log("\nFile upload failed");
    			res.redirect('404');
    		}
    		// console.log(result);
    	}
    });
	            }
      			
			})
          } else {
            message = "\nThis format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }


		// cat_name = data.category_name;
		// cat_file = data.file;
	}
	else{
    res.redirect('/admin/login');
}
};


exports.editCategory = (req, res)  => {
	if(req.session.email) 
	{
		console.log('edit category list ');
		let catId = req.body.id;
		let catname = req.body.category_name;
		console.log(req.body);
		var file=req.files.file;
		console.log(file);
		
		if(file!=null && file!='' && file!=undefined){
			var filename=file.name;
			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
				file.mv('./public/assets/img/'+filename, (err)=> {
	            if(err){
	                console.log("Please try again.");
	            }else{
	            	console.log("\nTrying to upload the file to Database");
					let query = "UPDATE `cat_image` SET `category` = '" + catname + "', `image` = '" + filename + "' WHERE `cat_image`.`id` = '" + catId + "' ";
					db.query(query, (err, result) => {
    				if(err)
    				{
    				console.log(err);
    				}else{
    				console.log('result\n', result);
    				res.redirect('category-list');
    				}
    });

				};
			}); // End of file.mv('./public/assets/img/'+file, 
			}else{
				console.log("Wrong file format");
			} 
		}else{
			let query = "UPDATE `cat_image` SET `category` = '" + catname + "' WHERE `cat_image`.`id` = '" + catId + "' ";
			db.query(query, (err, result) => {
    	if(err)
    	{
    		console.log(err);
    	}else{
    		console.log('result\n', result);
    		res.redirect('category-list');
    	}
    });
		}
		
	}else{
    res.redirect('/admin/login');
} 
};

exports.addProduct = (req, res)  => {
	if(req.session.email)
	{
		var data = req.body;
		var file = req.files.file;
		console.log(data);
		console.log(file);

		if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
			var filename = file.name;
			file.mv('./public/assets/img/'+filename, (err)=> {
				if(err){ 
	                console.log("Please try again.");
	            }else{
	            	console.log("\nTrying to upload the file to Database");
	            	let query = "INSERT INTO `product`(`product_category`,`product_name`,`product_location`,`product_description`,`product_image`) VALUES ('" + data.productCategory + "','" + data.productName + "','" + data.productLocation + "','" + data.productDescription + "','" + filename + "')";
	            	
	            	db.query(query, (err, result) => {
    				if(err)
    				{
    					console.log(err);
    				}else{
    					console.log('result\n', result);
    					if(result!=null && result!='' && result!=undefined)
    					{
    						console.log("\nProduct added Successfully");
    						res.redirect('back');
    					}else{
    						console.log("\nFailed");
    						res.redirect('404');
    					}
    		// console.log(result);
    	}
    });
				}
			});
		}

	}else{
    res.redirect('/admin/login');
	}
}

exports.editProduct = (req, res)  => {
	if(req.session.email) 
	{
		let catId = req.body.id;
		let data = req.body;
		var file=req.files.file;
		console.log(file);
		
		if(file!=null && file!='' && file!=undefined){
			var filename=file.name;
			if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ){
				file.mv('./public/assets/img/'+filename, (err)=> {
	            if(err){
	                console.log("Please try again.");
	            }else{
	            	console.log("\nTrying to upload the file to Database");
					let query = "UPDATE `product` SET `product_name` = '" + data.productName + "', `product_category` = '" + data.productCategory + "', `product_description` = '" + data.productDescription + "', `product_location` = '" + data.productLocation + "', `image` = '" + filename + "' WHERE `product`.`id` = '" + catId + "' ";
					db.query(query, (err, result) => {
    				if(err)
    				{
    				console.log(err);
    				}else{
    				console.log('result\n', result);
    				res.redirect('product-list');
    				}
    });

				};
			}); // End of file.mv('./public/assets/img/'+file, 
			}else{
				console.log("Wrong file format");
			} 
		}else{
			let query = "UPDATE `product` SET `product_name` = '" + data.productName + "', `product_category` = '" + data.productCategory + "', `product_description` = '" + data.productDescription + "', `product_location` = '" + data.productLocation + "' WHERE `product`.`id` = '" + catId + "' ";
			db.query(query, (err, result) => {
    	if(err)
    	{
    		console.log(err);
    	}else{
    		console.log('result\n', result);
    		res.redirect('product-list');
    	}
    });
		}
		
	}else{
    res.redirect('/admin/login');
} 
};