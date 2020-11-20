export const state = () => ({
  menu: [
    {
      category: "[ comfort zone ]",
      categoryIndex: 1,
      links: [
        {
          title: "menu.links.products",
          i18n: true,
          route: {
            name: "products",
            slug: null
          }
        }
      ]
    },
    {
      category: "/skin regimen/",
      categoryIndex: 1,
      links: [
        {
          title: "menu.links.products",
          i18n: true,
          route: {
            name: "products",
            slug: null
          }
        }
      ]
    },
    {
      category: "Davines",
      categoryIndex: 1,
      links: [
        {
          title: "menu.links.products",
          i18n: true,
          route: {
            name: "products",
            slug: null
          }
        }
      ]
    },
    {
      category: "menu.categories.products",
      i18n: true,
      categoryIndex: 2,
      link: "wellness-products",
      links: [
        {
          title: "menu.links.products",
          i18n: true,
          route: {
            name: "products",
            slug: null
          }
        }
      ]
    },
    {
      category: "menu.categories.events",
      i18n: true,
      categoryIndex: 3,
      link: "events",
      links: [
        {
          title: "menu.categories.events",
          i18n: true,
          route: {
            name: "events",
            slug: null
          }
        }
      ]
    },
    {
      category: "menu.categories.contacts",
      i18n: true,
      categoryIndex: 4,
      links: [
        {
          title: "menu.links.contacts",
          i18n: true,
          route: {
            name: "contacts"
          }
        }
      ]
    },
    {
      category: "menu.categories.articles",
      i18n: true,
      categoryIndex: 4,
      link: "articles",
      links: [
        {
          title: "menu.links.blog",
          i18n: true,
          route: {
            name: "articles"
          }
        }
      ]
    }
  ]
});

export const mutations = {
  init(state, data) {
    data.forEach(element => {
      let pseudoPos = element.menupos == 10 ? 2 : element.menupos;

      state.menu[pseudoPos].links.push({
        title: element.name,
        title_lv: element.name_lv,
        title_ru: element.name_ru,
        route: {
          name: "static",
          slug: element.slug
        }
      });
    });
  },
  initCatrgories(state, payload) {
    state.menu[0].category = payload[0].name;
    state.menu[0].category_lv = payload[0].name_lv;
    state.menu[0].category_ru = payload[0].name_ru;
    state.menu[0].links[0].route.slug = payload[0].slug;

    state.menu[1].category = payload[1].name;
    state.menu[1].category_lv = payload[1].name_lv;
    state.menu[1].category_ru = payload[1].name_ru;
    state.menu[1].links[0].route.slug = payload[1].slug;

    state.menu[2].category = payload[2].name;
    state.menu[2].category_lv = payload[2].name_lv;
    state.menu[2].category_ru = payload[2].name_ru;
    state.menu[2].links[0].route.slug = payload[2].slug;
  }
};
