var fetchValue = require("../core/fetch/value.js"),
    fetchColor = require("../core/fetch/color.js"),
    fetchText  = require("../core/fetch/text.js")
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sorts an array of objects
//------------------------------------------------------------------------------
d3plus.array.sort = function( arr , keys , sort , colors , vars ) {

  if ( !arr || arr.length <= 1 || !keys ) {
    return arr || []
  }

  if ( !sort ) {
    var sort = "asc"
  }

  if ( !(keys instanceof Array) ) {
    keys = [ keys ]
  }

  if ( !(colors instanceof Array) ) {
    colors = [ colors ]
  }

  function comparator( a , b ) {

    var retVal = 0

    for ( var i = 0 ; i < keys.length ; i++ ) {

      var k = keys[i]

      if ( vars ) {

        var depthKey = a.d3plus ? vars.id.nesting[a.d3plus.depth] : undefined
          , depthInt = a.d3plus ? a.d3plus.depth : undefined

        a = k === vars.text.value
          ? fetchText( vars , a , depthInt )
          : fetchValue( vars , a , k , depthKey )

        var depthKey = b.d3plus ? vars.id.nesting[b.d3plus.depth] : undefined
          , depthInt = b.d3plus ? b.d3plus.depth : undefined

        b = k === vars.text.value
          ? fetchText( vars , b , depthInt )
          : fetchValue( vars , b , k , depthKey )

      }
      else {
        a = a[k]
        b = b[k]
      }

      a = a instanceof Array ? a = a[0]
        : typeof a === "string" ? a = a.toLowerCase() : a
      b = b instanceof Array ? b = b[0]
        : typeof b === "string" ? b = b.toLowerCase() : b

      retVal = typeof a !== "number" && typeof b !== "number" && colors.indexOf(k) >= 0 ? d3plus.color.sort( a , b )
             : a < b ? -1 : 1

      if ( retVal !== 0 || i === keys.length-1 ) {
        break
      }

    }

    return sort === "asc" ? retVal : -retVal

  }

  if ( arr.length === 2 ) {
    return comparator(arr[0],arr[1])
  }

  return arr.sort(comparator)


}
