var fs = require('fs');


module.exports = function (req) {
  var root = process.cwd(); //root path

  return {
    javascript_path: function (path, key) {
      return req.assets_path(path, key, 'scripts');
    },
    stylesheet_path: function (path, key) {
      return req.assets_path(path, key, 'styles');
    },
    image_path: function (path, key) {
      var m_path = '';
      if(req.use_mobile && fs.existsSync(root + "/assets/images/mobile/" + path)) {
        m_path = 'mobile/' + path;  //should use mobile image ?
      }

      var extra = "", //需要额外追加的参数
          path_key = 'images/' + (m_path || path).replace(/^\//, ''),
          cdn_key = settings.need_cdn_map && (global.ImagesCDN || {})[path_key];
      if(!key && cdn_key) {
        //线上环境，如果图片没有key，表明可能未编译，则在映射文件中查找是否存在
        //path/a-md5.jpg => md5
        extra = "?from=cdnMap";
        key = cdn_key; // get cdn key
      }

      return req.assets_path(m_path || path, key, 'images', m_path, extra);
    },
    assets_path: function (path, key, type, m_path, extra) {
      if (path[0] == '/') path = path.substring(1);

      return '/' + type + '/' + (m_path || path);
    },
    path: function (path, locale) {
      var locale_path = req.get_locale_path(false, locale);
      if (path[0] == '/') path = path.substring(1);
      return locale_path + path;
    },
    url: function (path, secret, locale) {
      var locale_path = req.get_locale_path(false, locale),
          origin = secret == 'https' ? settings.origin.replace('http://', 'https://') : settings.origin;
      var l_url = origin + locale_path + path;
      if(l_url != '/' && /\/$/g.test(l_url)) { l_url = l_url.substring(0, l_url.length - 1); }
      return l_url;
    },
    //===== 返回带设备，语言信息的路径
    urls_with_langs_and_device: function (url, langs, devices) {
      langs = (langs == 'all' || !langs) ? req.support_lang : langs;
      devices = !devices ? ['/', '/mobile/'] : devices;
      var query_index = url.indexOf('?'),
          query = query_index > -1 ? url.substring(query_index) : '', //?query_str
          path = query_index > -1 ? url.substring(0, query_index) : url; //url path

      if(typeof langs === 'string') {
        langs = langs.split(',');
      }
      if(typeof devices === 'string') {
        devices = devices.split(',');
      }

      var langs_device = [];
      langs.forEach(function (lang) {
        lang = lang === 'en' ? '' : '/' + lang;
        devices.forEach(function (dev) {
          langs_device.push(lang + dev);
        });
      });

      path = path.replace(/^((\/)?mobile\/|\/)/, '');//replace first / or /mobile

      return langs_device.map(function (url_prefix) {
        var lang_path = url_prefix + path;
        if(lang_path != '/') { //去吃末尾的 /
          lang_path = lang_path.replace(/\/$/, '');
        }
        return lang_path + query;
      }).sort(function (a, b) {
        return a.has('/mobile/') ? 1 : -1;
      });
    },
    event_url: function (subdomain, event, lang) {
      var locale_path = lang ? '/' + lang : req.get_locale_path('event');
      return 'http://' + subdomain + '.dji.com/' + event + locale_path;
    },
    //语言切换
    change_language: function (language) {
      return settings.origin + language + req.path;
    },
    remote_url: function (path, remote_env) {
      var locale_path = req.get_locale_path('remote'),
          env = remote_env || settings.env;
      if (!path || /^http|\/\//g.test(path)) return path;
      if (path[0] == '/') path = path.substring(1);
      return settings.remote[env].origin + locale_path + path;
    },
    //===== 旧的cms 资源调用方法
    cdn: function (path, host, from) {
      if(settings.remote_env == 'development') {
        return path;
      }
      //=====if on production
      //去除path中的 s3 域名，使用智能cdn域
      path = path.replace(/http(s)?:\/\/s3.amazonaws.com\/(dji-www|dji-dbeta)\//g, '');
      if (!path || /^http|\/\//g.test(path)) return path;
      if (path[0] == '/') path = path.substring(1);
      var cdn_host = settings.cdn[settings.remote_env].host(path, host);
      if(from !== 'www') {
        cdn_host = cdn_host.replace('www', 'asset'); //以前cms upload的图片，不存在于www 的桶里，故需使用 store的桶
      }
      return cdn_host + '/' + path;
    },
    s3_cdn: function (path) {
      return req.cdn(path, 's3');
    },
    //===== 新官网的cms 资源调用方法
    www_cdn: function (path) {
      if(path) {
        return req.cdn(path, null, 'www');
      }else{
        return null;
      }
    },
    sub_feature_product_path: function (name) {
      var product = req.product || {};
      return req.helper.url(product.slug + "/" + name);
    },
    embed_video_url: function (url) {
      var re1 = /vimeo.com\/(\d+)/,
          re2 = /\.youku\.com\/player\.php\/sid\/(.+)\/v\.swf/,
          re3 = /\.youtube\.com\/watch\?v=(.+)/;
      if (re1.test(url)) {
        return "//player.vimeo.com/video/" + RegExp.$1;
      } else if (re2.test(url)) {
        return "http://player.youku.com/embed/" + RegExp.$1;
      } else if (re3.test(url)) {
        return "//www.youtube.com/embed/" + RegExp.$1;
      } else {
        return url;
      }
    },
    topics_url: function (slug) {
      return req.helper.url("topics/" + slug);
    },
    product_url: function (slug) {
      // return req.helper.url("product/" + slug);
      return req.helper.url(slug);
    },
    product_aircraft_url: function (slug) {
      return req.helper.url(slug + '/aircraft');
    },
    product_camera_url: function (slug) {
      return req.helper.url(slug + '/camera');
    },
    product_remote_url: function (slug) {
      return req.helper.url(slug + '/remote-controller');
    },
    product_app_url: function (slug) {
      return req.helper.url(slug + '/app');
    },
    product_info_url: function (slug) {
      return req.helper.url(slug + '/info');
    },
    product_service_url: function (slug) {
      return req.helper.url(slug + '/service');
    },
    feature_product_url: function (slug) {
      return req.helper.url(slug + "/feature");
    },
    category_url: function (category) {
      return req.helper.url("products/" + category);
    },
    get_locale_path: function (is_store, _locale) {
      var locale = req.locale || 'en',
          m_path = (req.use_mobile && !is_store) ? 'mobile/' : '',
          map = { 'zh-CN':'cn', 'zh-TW':'zh-tw', ko:'kr', ja:'jp' };
      locale = _locale || (map[locale] || locale);
      if(locale == 'en') locale = ''; //en not in path

      if(req.device == 'dds') {
        return locale == '' ? ('/dds/') : ('/' + locale + '/dds/');
      } else{
        return locale == '' ? ('/' + m_path) : ('/' + locale + '/' + m_path);
      }
    },
    //====== 从指定的路径中提取 语言信息
    //path 必须以 / 开头
    get_lang_from_path: function (path) {
      if(path[0] != '/') { return 'en'; }

      var pathParts = path.split('/'),
          langInPath = pathParts[1] || '',
          isSupport = req.support_lang.indexOf(langInPath) > -1;
      return isSupport ? langInPath : 'en';
    },
    get_domain_host:function (domain) {
      if(domain == 'store' && req.use_mobile) {
        domain = 'm';  // to m.dji.com
      }
      return settings.remote[settings.env].origin.replace('www', domain);
    },
    is_page: function (page) {
      return req.current_page == page;
    },
    set_page: function (page) {
      req.current_page = page;
    },
    account_url: function (path, locale) {
      var locale_path = req.get_locale_path(true, locale);

      if(!("/" + path).has(locale_path)) {  // 判断是否带上了语言
        path = locale_path + path;
      }

      // 判断url是否完整
      if (path.substring(0, 1) != '/') { path = "/" + path; }

      // buy link 中可能包含 ja/...  需要从链接上移除ja
      var account_path = req.get_domain_host('accounts') + path.replace('/ja', '');

      // 去掉俄语路径
      account_path = account_path.replace('http://', 'https://').replace(/\/ru\//, '/');

      return account_path.replace('http://', 'https://');
    },
    member_center_url: function (path, lang) {
      if (path[0] == '/') path = path.substring(1);

      var accountPath = 'https://account.dji.com/user/' + path;
      if(settings.env === 'staging') {
        accountPath = 'https://membercenter.dbeta.me/user/' + path;
      }

      var langMap = {
        en: 'en_US',
        cn: 'zh_CN',
        'zh-TW': 'zh_TW',
        ja: 'ja_JP',
        kr: 'ko_KR',
        fr: 'fr_FR',
        de: 'DE_DE',
        es: 'es_ES'
      };
      if(!lang) lang = req.lang;
      var locale = langMap[lang] ? langMap[lang] : langMap['en'];

      var loginUrl = accountPath;
      loginUrl += '&locale=' + locale;

      return loginUrl;
    },
    store_product_url: function (slug, param, _http) {
      var path = "product/" + slug;
      return req.helper.store_url(path, param, _http);
    },
    fly_safe: function (page) {
      return req.helper.url("flysafe") + (page ? '/' + page : '');
    },
    geo_system_url: function (page) {
      return req.helper.url('geo-system') + (page ? '/' + page : '');
    },
    developer_url: function (slug) {
      var locale_path = req.get_locale_path('developer');
      if (locale_path == '/cn/') {
        return 'https://developer.dji.com/cn/' + slug;
      }else{
        return 'https://developer.dji.com/' + slug;
      }
    },
    repair_url: function (path) {
      var locale_path = req.get_locale_path('repair');
      if(locale_path == '/') locale_path = "/en/";
      if(!("/" + path).has(locale_path)) {  // 判断是否带上了语言
        path = locale_path + path;
      }

      // 判断url是否完整
      if (path.substring(0, 1) != '/') { path = "/" + path; }

      return "https://repair.dji.com" + path.replace('/ja', '');
    },
    csr_url: function (path) {
      var locale_path = req.get_locale_path(false);
      var csr_path;

      if(settings.env == 'development') {
        if (path && path.substring(0, 1) != '/') { path = "/" + path; }
        csr_path = req.helper.url('citizenship') + path;
      } else {
        csr_path = req.get_domain_host('citizenship') + locale_path + path;
        if(csr_path != '/' && /\/$/g.test(csr_path)) {
          csr_path = csr_path.substring(0, csr_path.length - 1);
        }
      }

      return csr_path;
    },
    coupon_url: function (path) {
      var locale_path = req.get_locale_path(false);
      var csr_path;

      if(settings.env == 'development') {
        if (path && path.substring(0, 1) != '/') { path = "/" + path; }
        csr_path = req.helper.url('coupon') + path;
      } else {
        csr_path = req.get_domain_host('coupon') + locale_path + path;
        if(csr_path != '/' && /\/$/g.test(csr_path)) {
          csr_path = csr_path.substring(0, csr_path.length - 1);
        }
      }

      return csr_path;
    },
    enterprise_url: function (path) {
      var locale_path = req.get_locale_path(false);
      var enterprise_path;
      var enterprisePathRe = /^enterprise\/\w+/;

      if (enterprisePathRe.test(path)) {
        path = path.replace('enterprise/', '');
      }

      if(settings.env == 'development') {
        if (path && path.substring(0, 1) != '/') { path = "/" + path; }
        enterprise_path = req.helper.url('enterprise') + path;
      } else {
        enterprise_path = req.get_domain_host('enterprise') + locale_path + path;
        if(enterprise_path != '/' && /\/$/g.test(enterprise_path)) {
          enterprise_path = enterprise_path.substring(0, enterprise_path.length - 1);
        }
      }


      return enterprise_path;
    }
  };
};
