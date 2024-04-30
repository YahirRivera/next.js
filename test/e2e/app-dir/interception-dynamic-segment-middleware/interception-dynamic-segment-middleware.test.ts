import { nextTestSetup } from 'e2e-utils'
import { check } from 'next-test-utils'

describe('interception-dynamic-segment-middleware', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should work when interception route is paired with a dynamic segment & middleware', async () => {
    const browser = await next.browser('/')

    await browser.elementByCss('[href="/foo/p/1"]').click()
    await check(() => browser.elementById('modal').text(), /intercepted/)
    await browser.refresh()
    await check(() => browser.elementById('modal').text(), '')
    await check(() => browser.elementById('children').text(), /not intercepted/)
  })
})
