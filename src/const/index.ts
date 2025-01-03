const modules = import.meta.glob('./modules/*.ts');

const constes: any = {};

Object.keys(modules).forEach(async (file) => {
  const module = await modules[file]()
  Object.assign(constes, module);
});

// 此变量为异步变量(自动)
export default constes;

// 此变量为同步变量(手动)
export * from './modules/gatWay'
export * from './modules/rules'
