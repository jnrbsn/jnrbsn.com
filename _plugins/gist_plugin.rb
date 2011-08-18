module Jekyll

  class GistTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      if parts = @text.match(/([\d]*) (.*)/)
        gist_id, filename = parts[1].strip, parts[2].strip
        "<script type=\"text/javascript\" src=\"https://gist.github.com/#{gist_id}.js?file=#{filename}\"></script>"
      else
        ""
      end
    end
  end

end

Liquid::Template.register_tag('gist', Jekyll::GistTag)
