import type { User, ApiConfig } from './types';
import { createIoCContainer } from './ioc';

const iocContainer = createIoCContainer();

const renderUsers = async () => {
  const userService = iocContainer.resolve('users');
  const users = await userService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  iocContainer.register('apiConfig', config.api);
  delete (window as any).__CONFIG__;

  renderUsers();
};

window.onload = (event: Event) => {
  const loggerService = iocContainer.resolve('logger');
  loggerService.info('Page is loaded.');

  app();
};
