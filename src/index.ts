import type { User, ApiConfig } from './types';
import { createIoCContainer } from './ioc';

const iocContainer = createIoCContainer();
const userService = iocContainer.resolve('users');
const httpService = iocContainer.resolve('http');
const loggerService = iocContainer.resolve('logger');
const apiConfig = iocContainer.resolve('apiConfig');

const renderUsers = async (config: ApiConfig) => {
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
  delete (window as any).__CONFIG__;

  renderUsers(config.api);
};

window.onload = (event: Event) => {
  loggerService.info('Page is loaded.');

  app();
};
