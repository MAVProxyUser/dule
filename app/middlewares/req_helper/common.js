module.exports = function (req) {
  var root = process.cwd(); //root path

  return {
    set_page: function (type) {
      req.nav_page = type;
    },
    get_nav_active: function(page_type, this_type){
      return page_type == this_type ? 'active' : '';
    }
  }
}