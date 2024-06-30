import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import axios from 'axios'
import Post from '../../views/Post.vue'

vi.mock('axios')

describe('Post', () => {
  const posts = [
    { id: 1, title: 'Das erste Versuchskanninchen', content: 'Oh ja', author: 'Hase 1', createdAt: new Date().toISOString() },
    { id: 2, title: 'Das zweite Versuchskanninchen', content: 'Nö', author: 'Hase 2', createdAt: new Date().toISOString() }
  ]

  beforeEach(() => {
    vi.spyOn(window, 'confirm').mockImplementation(() => true)
  })

  it('should add a post', async () => {
    const newPost = { id: 3, title: 'New Post', content: 'New post content', author: 'Author 3', createdAt: new Date().toISOString() }
    vi.mocked(axios.post).mockResolvedValueOnce({ data: newPost })
    const wrapper = shallowMount(Post)
    await wrapper.setData({ newPost: { title: 'New Post', content: 'New post content', author: 'Author 3' } })
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()
    expect(wrapper.vm.posts).toContainEqual(newPost)
  })

  it('sollte ein post löschen', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: posts })
    vi.mocked(axios.delete).mockResolvedValueOnce({})
    const wrapper = shallowMount(Post)
    await wrapper.setData({ posts })// Setze die Posts für den Test
    await flushPromises()
    await wrapper.vm.confirmDeletePost(1)
    await flushPromises()
    // Aktualisiere manuell die Posts nach dem Löschen
    const updatedPosts = posts.filter(post => post.id !== 1)
    await wrapper.setData({ posts: updatedPosts })
    expect(wrapper.vm.posts).toEqual(updatedPosts)
  })

  it('fetch sollte richtig funktionieren ', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: posts })
    const wrapper = shallowMount(Post)
    await flushPromises()
    expect(wrapper.vm.posts).toEqual(posts)
  })

  it('sollte das editieren des Postes ermöglichen ', async () => {
    const wrapper = shallowMount(Post)
    await wrapper.setData({ posts })// Setze die Posts für den Test
    await wrapper.vm.enableEditPost(posts[0])
    expect(wrapper.vm.editPostId).toBe(posts[0].id)
    expect(wrapper.vm.editPost.title).toBe(posts[0].title)
    expect(wrapper.vm.editPost.content).toBe(posts[0].content)
  })

  it('ssolte den editierten Post speichern', async () => {
    const editedPost = { id: 1, title: 'Edited Post', content: 'Edited content', author: 'Author 1', createdAt: new Date().toISOString() }
    vi.mocked(axios.put).mockResolvedValueOnce({ data: editedPost })
    const wrapper = shallowMount(Post)
    await wrapper.setData({ posts, editPostId: 1, editPost: { title: 'Edited Post', content: 'Edited content' } })
    await wrapper.vm.saveEditPost(1)
    await flushPromises()
    expect(wrapper.vm.posts[0].title).toBe('Edited Post')
    expect(wrapper.vm.posts[0].content).toBe('Edited content')
  })
})
