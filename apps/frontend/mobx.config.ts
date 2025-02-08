import { configure } from 'mobx';

configure({
  enforceActions: 'always',
  observableRequiresReaction: true,
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  safeDescriptors: true,
});
