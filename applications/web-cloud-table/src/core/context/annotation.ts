//bean对象类的 类注解工厂。用在类上，创建Bean
export function Bean(beanName: string): Function {
  return (classConstructor: any) => {
    const props = getBeanProps(classConstructor);
    props.beanName = beanName;
  };
}

//方法的参数注解，带有参数注解的函数，会自动注入参数中的bean
export function Qualifier(name: string): Function {
  return (
    classPrototype: any,
    methodOrAttributeName: string,
    index: number,
  ) => {
    const constructor: any =
      typeof classPrototype == 'function'
        ? classPrototype
        : classPrototype.constructor;
    let props: any;

    if (typeof index === 'number') {
      // it's a parameter on a method
      let methodName: string;
      if (methodOrAttributeName) {
        props = getBeanProps(constructor);
        methodName = methodOrAttributeName;
      } else {
        props = getBeanProps(constructor);
        methodName = 'ibrBeanConstructor';
      }
      if (!props.autowireMethods) {
        props.autowireMethods = {};
      }
      if (!props.autowireMethods[methodName]) {
        props.autowireMethods[methodName] = {};
      }
      props.autowireMethods[methodName][index] = name;
    }
  };
}

function getBeanProps(target: any): any {
  // eslint-disable-next-line no-prototype-builtins
  if (!target.hasOwnProperty('__ibrBeanMetaData')) {
    target.__ibrBeanMetaData = {};
  }

  return target.__ibrBeanMetaData;
}
