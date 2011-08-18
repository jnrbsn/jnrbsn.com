module Jekyll

  class SortedCategoriesBuilder < Generator
    safe true
    priority :high

    def generate(site)
      site.config['sorted_categories'] = site.categories.map { |cat, posts|
        [ cat, posts.size, posts ] }.sort { |a,b| a[0] <=> b[0] }
    end
  end

end
