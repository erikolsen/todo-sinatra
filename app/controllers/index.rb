get '/' do
	@tasks = Task.all
  erb :index
end

get '/new' do
	if request.xhr?
		erb :_create_task_form, layout: false
	else
		redirect to '/nope'
	end
end


post '/create' do
	@task = Task.create!(name: params[:task])

	if @task.valid? 
		if request.xhr?

			erb :_task_list, layout: false, locals: { task: @task }
		else
			redirect to '/notAjax'
		end
	else
		redirect to '/notvalid'
	end
end

post '/complete' do 
	puts "This is the name: #{params[:name]}"
	name = params[:name]
	@task = Task.where(name: name).first
	@task.update_attributes(complete: "true")
	puts "This is the task name: #{@task.name}"
	# if request.xhr?

	# 	{complete: @task.complete}.to_json
	# else
	# 	redirect to "/bobville"
	# end
end

post '/incomplete' do 
	puts "This is the name: #{params[:name]}"
	name = params[:name]
	@task = Task.where(name: name).first
	@task.update_attributes(complete: "false")
	puts "This is the task name: #{@task.name}"
	# if request.xhr?

	# 	{complete: @task.complete}.to_json
	# else
	# 	redirect to "/bobville"
	# end
end

