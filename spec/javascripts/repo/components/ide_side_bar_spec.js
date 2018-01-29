import Vue from 'vue';
import store from '~/ide/stores';
import ideSidebar from '~/ide/components/ide_side_bar.vue';
import { resetStore } from '../helpers';
import { createComponentWithStore } from '../../helpers/vue_mount_component_helper';

describe('IdeSidebar', () => {
  let vm;

  beforeEach(() => {
    const Component = Vue.extend(ideSidebar);

    vm = createComponentWithStore(Component, store).$mount();

    vm.$store.state.leftPanelCollapsed = false;
  });

  afterEach(() => {
    vm.$destroy();

    resetStore(vm.$store);
  });

  it('renders a sidebar', () => {
    expect(vm.$el.querySelector('.multi-file-commit-panel-inner')).not.toBeNull();
  });

  describe('collapsed', () => {
    beforeEach((done) => {
      vm.$store.state.leftPanelCollapsed = true;

      Vue.nextTick(done);
    });

    it('adds collapsed class', () => {
      expect(vm.$el.classList).toContain('is-collapsed');
    });

    it('shows correct icon', () => {
      expect(vm.currentIcon).toBe('angle-double-right');
    });
  });
});
