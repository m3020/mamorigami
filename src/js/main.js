function getSearchObj(searchStr) {
    if (!searchStr) return {};
    return searchStr
      .substr(1)
      .split("&")
      .reduce((acc, cur) => {
        acc[cur.split("=")[0]] = cur.split("=")[1];
        return acc;
      }, {});
  }

const query = getSearchObj(window.location.search)
const type= query.t

switch (type) {
    case "tate":
        entries.push(new Entry('target', 'StoryBoard.verticalBounce', 'StoryBoard.verticalBounce'));
        break;
    case "wave":
        entries.push(new Entry('target', 'StoryBoard.verticalBounce2', 'StoryBoard.verticalBounce2'));
        break;
    case "yoko":
        entries.push(new Entry('target', 'StoryBoard.horizontalBounce', 'StoryBoard.horizontalBounce'));
        break;
    case "break":
        entries.push(new Entry('target', 'StoryBoard.breakConsentlate', 'StoryBoard.breakConsentlate'));
        break;
    case "exitin":
        entries.push(new Entry('target', 'StoryBoard.exitIn', 'StoryBoard.exitIn'));
        break;
    case "huge":
        entries.push(new Entry('target', 'StoryBoard.charDrop', 'StoryBoard.charDrop'));
        break;
    case "rainbaw":
        entries.push(new Entry('target', 'StoryBoard.rainbow', 'StoryBoard.rainbow'));
        break;
    default:
        entries.push(new Entry('target', 'StoryBoard.verticalBounce2', 'StoryBoard.verticalBounce2'));
        break;
}