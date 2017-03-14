# Scroll Into View

#### jQuery plugin to scroll an element into view

Scrolls an element into view, whether it's partiall or completely off screen.

This is useful for tasks where elements may become available or change shape, such as forms or dropdowns, especially on mobile where there is not much room.

Elements will, by-default, scroll onto the screen just enough that the whole element is visible. Where an element is taller than the available viewport, it will scroll so the top of the element is visible.

The plugin has options for:

 - top and bottom offsets, to account for fixed headers and footers
 - padding top and bottom, to give the scrolled element some breathing room
 - forcing scrolling, even if on-screen
 - passing a custom scroll function
 - scroll duration

### Usage

Basic usage (no header or footer, 20px padding):

    $(element).scrollIntoView()

Pass custom values:

    $(element).scrollIntoView({vt: '#nav', vb: 'footer', pt: 0})

### Default options

Set default options directly on the plugin:

    $.fn.scrollIntoView.defaults({vt: 'header.main', vb: 'footer', pt: 50, pb:20})

Get default options:

    $.fn.scrollIntoView.defaults()

### Available options:

Set offsets for the top (vt) and bottom (vb) of the viewport, useful for fixed menus:

    {vt: 100}           // Set a 100px offset at the top of the viewport
    {vt: '#nav'}        // Set the offset at the top viewport to be the height of the #nav element
    {vb: 50}            // Set a 50px offset at the bottom of the viewport

Set padding for the top (pt) and bottom (pb) of elements, useful to give some breathing space:

    {pt: 50}            // Give the top of the element 50px breathing room
    {pt: '20%'}         // Give the top of the element 20% of the available breathing room
    {pt: 'auto'}        // Position the element in the center of the viewport
    {pb: 20}            // Give the bottom of the element 20px breathing room

Force the element to scroll, even if already on-screen:

    // force
    {force: true}       // Always scroll

Set the scroll duration:

    // duration
    {duration: 200}     // Complete the scroll in 200ms
    {duration: 'slow'}  // Complete the scroll in the jQuery 'slow' animation duration

Pass a custom scroll function:

    // fn
    {fn: scrollMe}      // Calls scrollMe(top, options, values)

The `options` parameter is the plugin's current options, and the `values` parameter is are from the plugins calculations – should you wish to perform additional operations – and is as follows:

    key  | object    | property             | value (sample)
    -----+-----------+----------------------+-------
    wh   | window    | height               |   960 
    wy   | window    | scroll (y-position)  |   100 
    vt   | viewport  | top offset           |    56 
    vb   | viewport  | bottom offset        |     0 
    vh   | viewport  | height               |   904 
    pt   | padding   | top                  |    20 
    pb   | padding   | bottom               |    20 
    eh   | element   | height               |   788 
    et   | element   | top                  |   670 
    eb   | element   | bottom               |  1458 
    ot   | offset    | top                  |   614 
    ob   | offset    | bottom               |   498 

The offset top and bottom values are the distance the top and bottom of the padded element are from the top and bottom of the viewport top and bottom.
