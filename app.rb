require "sinatra"

helpers do

	def styles
		output = ""
		["bootstrap.min", "main.min"].each do |src|
			output += haml "%link{rel: :stylesheet, href: '/css/#{src}.css'}"
		end
		output
	end

	def scripts
		output = ""
		["modernizr.min", "jquery.min", "plugins", "bootstrap.min", "main.c.min"].each do |src|
			output += haml "%script{src: '/js/#{src}.js'}"
		end
		output
	end

end

get "/" do
	haml :index
end