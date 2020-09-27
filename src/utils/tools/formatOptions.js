const formatOptions = (rawOptions) => {
  let formattedOptions = {
    app_name: null,
    frontend: {
      styled_components: false,
      css: false,
      sass: false,
      redux: false,
      mobx: false,
      query: false,
      routing: false,
      documentation: false, 
      storybook: false,
      helmet: false,
      jest: false,
      mocha: false,
      cypress: false
    },
    backend: {
      express: false,
      koa: false,
      mongoDB: false,
      postgreSQL: false
    },
    common: {}
  };

  formattedOptions.app_name = rawOptions.app_name;
  formattedOptions.common = rawOptions.common;
  //convert frontend options

  if (rawOptions.frontend.style_system === 'styled-components') {
    formattedOptions.frontend.styled_components = true;
  } else if (rawOptions.frontend.style_system === 'sass') {
    formattedOptions.frontend.sass = true;
  } else if (rawOptions.frontend.style_system === 'css') {
    formattedOptions.frontend.css = true;
  }
  if (rawOptions.frontend.state_management === 'react-redux') {
    formattedOptions.frontend.redux = true;
  } else if (rawOptions.frontend.state_management === 'react-query') {
    formattedOptions.frontend.query = true;
  } else if (rawOptions.frontend.state_management === 'mobx') {
    formattedOptions.frontend.mobx = true;
  }
  formattedOptions.frontend.routing = rawOptions.frontend.routing;
  formattedOptions.frontend.helmet = rawOptions.frontend.helmet;
  formattedOptions.frontend.documentation = rawOptions.frontend.documentation;
  formattedOptions.frontend.storybook = rawOptions.frontend.storybook;
  
  if (rawOptions.frontend.testing === 'jest') {
    formattedOptions.frontend.jest = true;
  } else if (rawOptions.frontend.testing === 'mocha') {
    formattedOptions.frontend.mocha = true;
  } else if (rawOptions.frontend.testing === 'cypress') {
    formattedOptions.frontend.cypress = true;
  }
  //convert backend options
  if (rawOptions.backend.backend_type === 'express') {
    formattedOptions.backend.express = true;
  } else if (rawOptions.backend.backend_type === 'koa') {
    formattedOptions.backend.koa = true;
  }
  
  if (rawOptions.backend.database === 'mongoDB') {
    formattedOptions.backend.mongoDB = true;
  } else if (rawOptions.backend.database === 'postgreSQL') {
    formattedOptions.backend.postgreSQL = true;
  }
  
  return formattedOptions;
}

module.exports = formatOptions;