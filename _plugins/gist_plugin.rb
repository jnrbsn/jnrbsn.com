module Jekyll

  class GistTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      if parts = @text.match(/([\d]*) (.*)/)
        gist_id, filename = parts[1].strip, parts[2].strip
        url = "http://gist.github.com/#{gist_id}\#file_#{filename}"
        "<a href=\"#{url}\" data-gist=\"#{gist_id}\" data-gist-file=\"#{filename}\">#{url}</a>"
      else
        ""
      end
    end
  end

end

Liquid::Template.register_tag('gist', Jekyll::GistTag)
