// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'print-titles') {
    const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    console.log(msg.checked);

    let pages = figma.currentPage.parent?.children || [];
    let pageTitles = [];
    let title = '';
    let allTitles = '';

    if (msg.checked) {
      for (let i = 0; i < pages.length; i++) {
        title = pages[i].name;
        pageTitles.push(title);
        const text = figma.createText();
        text.y = i * 20;
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        text.characters = title;
      }
    } else {
      for (let i = 0; i < pages.length; i++) {
        if (i != 0) {
          allTitles += '\r\n';
        }
        title = pages[i].name;
        pageTitles.push(title);
        allTitles += title;
      }

      const text = figma.createText();
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      text.characters = allTitles;
    }
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
