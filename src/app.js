const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicDiractoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDiractoryPath));


app.get('', (req,res) => {
    res.render('index.hbs', {
        title : 'Weather ',
        name : 'Akshay Shailesh'
    });
})

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        title : 'About Me',
        name : 'Akshay Shailesh'
    });
});

app.get('/help', (req,res) => {
    res.render('help.hbs', {
        title : 'Help Page',
        name : 'Akshay Shailesh',
        helperText : 'This page has some helpful text'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error : 'You must prodive location! '
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast : forecastData,
                location ,
                address : req.query.address 
            });

        });
    });
});


app.get('/help/*', (req, res) =>{
    res.render( '404.hbs', {
        title : '404',
        name : 'Akshay Shailesh',
        errorMessage : 'Help Page not found'
    });
});

app.get('*', (req, res) =>{
    res.render('404.hbs', {
        title : '404',
        name : 'Akshay Shailesh',
        errorMessage : 'Page not found'
    });
});


app.listen(port, () =>{
    console.log('Server is up on port ' + port );
});
