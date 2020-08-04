const fs = require('fs');
// admin login page
exports.login = (req, res) => {
	// console.log('admin login page')

    res.render('admin/layout/login-layout.ejs', {
        title: "Admin Login",
        message: '',
        yield:'../pages/login',
    });
};

exports.userList = (req, res) => {
	console.log('admin login page')
if(req.session.email)
{
    res.render('admin/layout/admin-layout.ejs', {
        title: "User List",
        message: '',
        yield:'../pages/user-list',
    });
}else{
    res.redirect('/admin/login');
}
};


exports.dashboard = (req, res) => {
	// console.log('dashboard page')
 //    console.log(req.session.email);
if(req.session.email)
{

        res.render('admin/layout/admin-layout.ejs', {
            title: "Dashboard",
            message: '',
            yield:'../pages/dashboard',
        });
}else{
    res.redirect('/admin/login');
}
};


exports.addCategories = (req, res) => {
    console.log('\nAdmin GET.add-categories\n')
if(req.session.email)
    {

    res.render('admin/layout/admin-layout.ejs', {
        title: "Create Category",
        message: '',
        yield:'../pages/category/create-category',
    });
    }else{
    res.redirect('/admin/login');
}
};

exports.categoryList = (req, res) => {
    // console.log('admin login page')
if(req.session.email)
    {
        let fetchquery = "SELECT * FROM `cat_image`";
        db.query(fetchquery,(err,result)=>{
        // console.log(fetchquery);
            if(err) {
            console.log(err); 
        }
        else {
            // console.log(result);
            // res.write(result); 
            // res = result;
        
        res.render('admin/layout/admin-layout.ejs', {
        title: "Category List",
        message: '',
        yield:'../pages/category/category-list',
        userData: result,
    });
        }
});
   }else{
    res.redirect('/admin/login');
}
};

exports.productList = (req, res) => {
    console.log('admin login page')
if(req.session.email)
    {
        let query = "SELECT * FROM `product`";
        db.query(query,(err,result)=>{
        // console.log(fetchquery);
            if(err) {
            console.log(err); 
        }
        else {
                res.render('admin/layout/admin-layout.ejs', {
                title: "Product List",
                message: '',
                yield:'../pages/product/product-list',
                userData: result,
            });
           }
       })
   }else{
    res.redirect('/admin/login');
}
};

exports.addProduct = (req, res) => {
    console.log('Add Product');
if(req.session.email)
    {
        let query = "SELECT `category` FROM `cat_image`";
        db.query(query, (err, result) => {
            if (err)
            {
                console.log("Error : " + err);
            }else{
                res.render('admin/layout/admin-layout.ejs', {
                title: "Add Product",
                message: '',
                yield:'../pages/product/create-product',
                result:result,
            });
            }
        });

    }else{
    res.redirect('/admin/login');
    }
};


exports.updatePassword = (req, res) => {
    console.log('create product');
if(req.session.email)
    {
    res.render('admin/layout/admin-layout.ejs', {
        title: "Update Password",
        message: '',
        yield:'../pages/update-password',
    });
}else{
    res.redirect('/admin/login');
}
};

exports.orderList = (req, res) => {
    console.log('Order list');
if(req.session.email)
    {
    res.render('admin/layout/admin-layout.ejs', {
        title: "Order list",
        message: '',
        yield:'../pages/order/order-list',
    });
}else{
    res.redirect('/admin/login');
}
};

exports.deleteCategory = (req, res) => {
    // console.log('Delete Category')
if(req.session.email)
    {
        let catId = req.params.id;
        console.log(catId);
        let query = 'DELETE FROM `cat_image` WHERE id = "' + catId + '"';
        console.log(query);

        db.query(query, (err, result) => {
            if (err)
            {
                console.log("Error : " + err);
            }
            else{
                res.redirect('/admin/category-list');
            }
  })
    }else{
    res.redirect('/admin/login');
}
};

exports.editCategory = (req, res) => {
    console.log('Edit Category');
if(req.session.email)
    {
        let catId = req.params.id;
        let query = "SELECT * FROM `cat_image` WHERE id = '" + catId + "' ";
        db.query(query, (err, result) => {
            if (err)
            {
                console.log("Error : " + err);
            }else{
                console.log(result);
                res.render('admin/layout/admin-layout.ejs', {
                title: "Edit Category",
                message: '',
                yield:'../pages/category/edit-category',  
                result:result,          
            });
        }
    });
        
        }
        else{
    res.redirect('/admin/login');
    }
};

exports.deleteProduct = (req, res) => {
    // console.log('Delete Category')
if(req.session.email)
    {
        let catId = req.params.id;
        console.log(catId);
        let query = 'DELETE FROM `product` WHERE id = "' + catId + '"';
        console.log(query);

        db.query(query, (err, result) => {
            if (err)
            {
                console.log("Error : " + err);
            }
            else{
                res.redirect('/admin/product-list');
            }
  })
    }else{
    res.redirect('/admin/login');
}
};

exports.editProduct = (req, res) => {
    console.log('Edit Hotel');
if(req.session.email)
    {
        let catId = req.params.id;
        let query = "SELECT * FROM `product` WHERE id = '" + catId + "' ";
        db.query(query, (err, result) => {
            if (err)
            {
                console.log("Error : " + err);
            }else{
                console.log(result);
                res.render('admin/layout/admin-layout.ejs', {
                title: "Edit Product",
                message: '',
                yield:'../pages/product/edit-product',  
                result:result,          
            });
        }
    });
         }
        else{
    res.redirect('/admin/login');
    }
};