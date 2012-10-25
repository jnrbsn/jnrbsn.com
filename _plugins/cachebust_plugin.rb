require 'digest/md5'

module Jekyll

  class CacheBustHashGenerator < Generator
    safe true
    priority :high

    def generate(site)
      site.config['cachebust_hash_css'] = Digest::MD5.hexdigest(File.read(site.config['source'] + '/assets/css/main.less'))
      site.config['cachebust_hash_js'] = Digest::MD5.hexdigest(File.read(site.config['source'] + '/assets/js/main.js'))
    end
  end

end
