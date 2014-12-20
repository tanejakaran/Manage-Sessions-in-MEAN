################### Set up process ###########################

1. Install Mongodb and nodejs.
2. Run mongodb connection (http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).
3. Create db with name "simple".
4. Import "db/categories.json" collection to "simple" db.
5. Extract the folder and navigate to folder.
6. Run commands one by one:
	a) npm install ( will install dependency ).
	b) npm start.
7. If everything did properly you can check http://localhost:3000/ will load page.

################### Working flow   ##############

1. After filling information in input fields when you click process function will called under HomeController

	$scope.process = function(path) { var loginresponse = $scope.login(); };

2. Process function again calling login function which call a nodejs route and set data.

	$http.post('/login', {username:username,category:category, isCheck: isCheck}). success(function(data, status, headers, config) { if(data==='done') $state.go("verification"); })

	This is actually calling function of app.js at server side file

	app.post('/login',function(req,res){ sess=req.session; sess.username=req.body.username; sess.category=req.body.category; sess.isCheck=req.body.isCheck; res.end('done');});

	Which set data in session and return done. As you can see if response is done then login function redirecting to verification page.

3) In verification function session data is get by a request to getsession route.

	$http.get('/getsession').success(function(data){});

4) Get session route return session data and then we are setting this data to angular template view.

5) Now If we click on modify button It redirect to home with modify parameter.
6) If we get modify parameter on home route then fetch data from session andset it to view.

Thats it