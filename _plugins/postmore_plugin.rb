module PostMore

  def postmorefilter(input, url)
    if input.include? '<!--more-->'
      input.split('<!--more-->').first+'<a href="'+url+'">Continue reading &rarr;</a>'
    else
      input
    end
  end

end

Liquid::Template.register_filter(PostMore)
