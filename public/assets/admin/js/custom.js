

$("#add_category_form").validate({
			rules: {
				category_name: {
					required: true,
					minlength: 2
				},
				
				file: {
					required: true,
					extension: "png|jpe?g"
				  },
				
			},
			messages: {
				category_name: {
					required: "Please enter a Category Name",
					minlength: "Your Cateogory Name must consist of at least 2 characters"
				},
			}
		});

// ________________ ADD Product _____________________

$("#add_product_form").validate({
			rules: {
				productCategory: {
					required: true,
				},

				productName: {
					required: true,
					minlength: 2
				},

				file: {
					required: true,
					extension: "png|jpe?g"
				  },
				
			},
			messages: {
				productCategory: {
					required: "Please Select a valid Category",
				},
				productName: {
					required: "Please enter a Valid Name",
					minlength: "Your Product Name must consist of at least 2 characters"
				},

				file: {
					required: "File must be JPG or PNG"
				},
				
			}
		});

