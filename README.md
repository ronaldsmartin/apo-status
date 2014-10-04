What's My Status?
=================

The Delta Zeta Chapter of Alpha Phi Omega uses a network of Google Forms and Sheets to track service hours, membership requirements, and contact info.

Using the [API developed for the APO app](https://gist.github.com/ronaldsmartin/47f5239ab1834c47088e), this Angular app asynchronously requests data for a single user and then displays it with some formatting.

It's basically a fraction of the [APO app](http://upennapo.org/app) on the web. Try it [here](http://ronaldsmartin.github.io/apo-status/).

## Dependencies

* Angular.js
* Bootstrap
* jQuery because Bootstrap requires it

## Future Plans

1. This is my first Angular app and doesn't do a great job with modulariation... Use multiple controllers to manage the different views.
2. Create new views so that people can check out the details for service projects and other events they've attended.
3. Use D3.js to make visualizations for the data.
