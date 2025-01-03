function loadRouter(rules){
  const modules = import.meta.glob(['router/modules/*.ts', 'router/modules/*.tsx']);
  Object.keys(modules).forEach(async (file) => {
    const module = await modules[file]()
    // 1. 检查传递进来的rules
  });
}

export default loadRouter