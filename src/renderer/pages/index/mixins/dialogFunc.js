export const dialogFunc = {
  data () {
    return {

    }
  },
  methods: {
    async openDialog(width, height, path, query, name, callback, alwaysOnTop = true) {
      let data = await this.$Win.openWin({
        width: width,
        height: height,
        alwaysOnTop: alwaysOnTop,
        windowConfig: {
          router: path,
          data: query,
          name: name
        }
      });
      callback&&callback(data);
    }
  }
}