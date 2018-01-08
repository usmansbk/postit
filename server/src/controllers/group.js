import bunyan from 'bunyan';
import { Group, User, Post, Sequelize, sequelize } from '../../db/models';
import Util from '../helpers';

const { Op } = Sequelize;
const log = bunyan.createLogger({ name: 'postit-group-controller' });

export default class GroupController {
  static postMessage(req, res) {
    const { message } = req.body,
      { guid } = req.params,
      { userId } = req.session;
    Group.findOne({
      where: { id: guid },
      include: [{
        model: User,
        as: 'Members',
        where: { id: userId },
      }]
    }).then((group) => {
      if (!group) throw new Error();
      return User.findById(userId).then(user =>
        sequelize.transaction(t =>
          Post.create({ message }, { transaction: t }).then(post =>
            post.setAuthor(user, { transaction: t }).then(() =>
              group.addPost(post, { transaction: t }).then(() => post)))));
    }).then(result =>
      res.status(201).json({
        status: 'success',
        data: result
      }))
      .catch((error) => {
        log.info('postMessage()', error);
        res.status(401).json({
          status: 'fail',
          data: {
            message: 'Not a group member'
          }
        });
      });
  }

  static retrieveMessages(req, res) {
    const { guid } = req.params,
      { userId } = req.session;
    Group.findOne({
      where: { id: guid },
      include: [{
        model: User,
        as: 'Members',
        where: { id: userId },
      }]
    }).then((group) => {
      if (!group) throw new Error();
      return group.getPosts();
    }).then(posts =>
      res.status(200).json({
        status: 'success',
        data: { posts }
      })).catch((error) => {
      log.info('retrieveMessages()', error);
      res.status(401).json({
        status: 'fail',
        data: {
          message: 'Not a group member'
        }
      });
    });
  }

  static addUsers(req, res) {
    const { guid } = req.params,
      { invites } = req.body,
      { userId } = req.session,
      usersQueryList = Util.makeColumnList(invites, 'username');
    Group.findOne({
      where: { id: guid },
      include: [{
        model: User,
        as: 'Creator',
        where: { id: userId },
      }]
    }).then((group) => {
      if (!group) throw new Error();
      return User.findAll({
        where: {
          [Op.or]: usersQueryList
        }
      }).then(users => group.addMembers(users));
    }).then(result =>
      res.status(200).json({
        status: 'success',
        data: { result }
      })).catch((error) => {
      log.info('addUsers', error);
      res.status(401).json({
        status: 'fail',
        data: {
          message: 'Only admin can add user'
        }
      });
    });
  }

  static createGroup(req, res) {
    const { userId } = req.session;
    User.findById(userId).then(user =>
      sequelize.transaction((t) => {
        if (!user) throw new Error();
        return Group.create(req.body, { transaction: t }).then(group =>
          group.setCreator(user, { transaction: t }).then(creatorGroup =>
            group.addMember(user, { transaction: t }).then(() => creatorGroup)));
      })).then(result =>
      res.status(201).json({
        status: 'success',
        data: {
          result
        }
      })).catch((error) => {
      log.info('createGroup()', error);
      res.status(401).json({
        status: 'fail',
        data: {
          message: 'Not signed in'
        }
      });
    });
  }
}
