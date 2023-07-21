var meuStorage = window.localStorage;

function clearAllProjects(){
	meuStorage.clear();	
}

function setNewProject(content){
	var name = "Project"+meuStorage.length;
	meuStorage.setItem(name, content);	
	return name;
}

function saveProject(name, content){
	meuStorage.setItem(name, content);	
}

function getListProject(){
	var a = [];
	for( key in meuStorage){
		a.push(key);
	}
	return a;
}

function getProject(item){
	return meuStorage.getItem(item);
}

function deleteProject(item){
	console.log(item);
	meuStorage.removeItem(item);
}