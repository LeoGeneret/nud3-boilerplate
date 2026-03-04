import config from '@payload-config'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Project } from '@/payload-types'
import ProjectModal from '@/app/(frontend)/components/projectModal/ProjectModal'

// get selected page by slug
const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const parsedSlug = decodeURIComponent(slug) // decode the slug (without any special chars)
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'projects',
    limit: 1,
    where: {
      slug: {
        equals: parsedSlug,
      },
    },
  })
  return result.docs?.[0] || null
})

export default async function Page(props: any) {
  const params = await props.params

  const { slug = 'index' } = params

  const page: Project = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return notFound()
  }

  return <ProjectModal />
}
