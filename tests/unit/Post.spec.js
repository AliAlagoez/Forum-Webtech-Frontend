import { shallowMount } from '@vue/test-utils'
import Post from '@/views/Post.vue'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')

describe('Post.vue', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('fetches posts on component mount and displays them', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1', createdAt: Date.now() },
      { id: 2, title: 'Post 2', content: 'Content 2', author: 'Author 2', createdAt: Date.now() }
    ]

    axios.get.mockResolvedValueOnce({ data: mockPosts })

    const wrapper = shallowMount(Post)

    await flushPromises()

    const renderedTitles = wrapper.findAll('td.title').map(td => td.text())
    const renderedAuthors = wrapper.findAll('td.author').map(td => td.text())

    expect(renderedTitles).toEqual(mockPosts.map(post => post.title))
    expect(renderedAuthors).toEqual(mockPosts.map(post => post.author))
  })

  it('displays "No posts yet!" when no posts are returned from the server', async () => {
    axios.get.mockResolvedValueOnce({ data: [] })

    const wrapper = shallowMount(Post)

    await flushPromises()

    expect(wrapper.text()).toContain('No posts yet!')
  })

  it('allows editing of posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1', createdAt: Date.now() }
    ]

    axios.get.mockResolvedValueOnce({ data: mockPosts })

    const wrapper = shallowMount(Post)

    await flushPromises()

    const editButton = wrapper.find('.edit-button')
    await editButton.trigger('click')

    const editedPost = { title: 'Edited Title', content: 'Edited Content' }

    wrapper.setData({ editPost: editedPost })

    axios.put.mockResolvedValueOnce({})

    const saveButton = wrapper.find('.save-button')
    await saveButton.trigger('click')

    await flushPromises()

    expect(wrapper.text()).toContain('Edited Title')
    expect(wrapper.text()).toContain('Edited Content')
  })

  it('allows deleting posts', async () => {
    const mockPosts = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'Author 1', createdAt: Date.now() }
    ]

    axios.get.mockResolvedValueOnce({ data: mockPosts })

    const wrapper = shallowMount(Post)

    await flushPromises()

    axios.delete.mockResolvedValueOnce({})

    const deleteButton = wrapper.find('.delete-button')
    await deleteButton.trigger('click')

    await flushPromises()

    expect(wrapper.text()).not.toContain('Post 1')
  })
})
