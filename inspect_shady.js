const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://automationintesting.online/');
  await page.waitForTimeout(6000);
  console.log('loaded');

  const bodyText = await page.locator('body').textContent();
  console.log('body text snippet', bodyText?.slice(0, 1000));

  const summary = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('a,button,input,label,div,span'));
    return nodes
      .filter(el => el.textContent && /Book Now|Book now|Check In|Check Out|Check Availability|Return home|Firstname|Lastname|Email|Phone/i.test(el.textContent))
      .slice(0, 40)
      .map(el => ({
        tag: el.tagName,
        text: el.textContent.trim().replace(/\s+/g, ' '),
        role: el.getAttribute('role'),
        ariaLabel: el.getAttribute('aria-label'),
        id: el.id,
        classes: el.className,
        selector: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : '') + (el.className ? `.${el.className.toString().replace(/\s+/g, '.')}` : ''),
      }));
  });
  console.log('summary elements', JSON.stringify(summary, null, 2));

  const accessibility = await page.accessibility.snapshot({ interestingOnly: false });
  const findRole = (node, role) => {
    const found = [];
    const traverse = n => {
      if (!n) return;
      if (n.role === role) found.push(n);
      if (n.children) n.children.forEach(traverse);
    };
    traverse(node);
    return found;
  };

  const gridcells = findRole(accessibility, 'gridcell');
  console.log('gridcell count', gridcells.length, gridcells.slice(0, 10).map(n => ({ name: n.name, role: n.role })));
  const textboxes = findRole(accessibility, 'textbox');
  console.log('textbox count', textboxes.length, textboxes.slice(0, 10).map(n => ({ name: n.name, role: n.role })));
  const links = findRole(accessibility, 'link');
  console.log('link count', links.length, links.slice(0, 20).map(n => ({ name: n.name, role: n.role })));

  await browser.close();
})();
