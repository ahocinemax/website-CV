const container =	document.querySelector(".main-container");
const Projects =	Array.from(container.children);

container.addEventListener('hover', e =>
{
	const targetProject = e.target.closest(".sub-container");
	if(!targetProject) return;

	
});

console.log(Projects);