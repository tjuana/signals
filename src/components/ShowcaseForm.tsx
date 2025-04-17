// components/ShowcaseProfileForm.tsx
import { createForm } from '@/core/form/createForm'
import { useReactiveDOM } from '@/core/hooks/useReactiveDOM'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Title } from '@/components/ui/Title'
import { Button } from '@/components/ui/Button'
import { RenderCount } from '@/components/ui/RenderCount'
import { useRef } from 'react'

const profileForm = createForm({
  fields: {
    email: {
      initial: '',
      validate: (v) => v.includes('@') ? null : 'Missing @'
    },
    age: {
      initial: 18,
      validate: (v) => v < 18 ? 'Too young' : null
    }
  }
})

export const ShowcaseProfileForm = () => {
  const emailRef = profileForm.email.ref
  const ageRef = profileForm.age.ref
  const emailErrorRef = useRef<HTMLParagraphElement>(null)
  const ageErrorRef = useRef<HTMLParagraphElement>(null)
  const validRef = useRef<HTMLParagraphElement>(null)

  useReactiveDOM(emailRef, profileForm.email.value)
  useReactiveDOM(ageRef, profileForm.age.value)
  useReactiveDOM(emailErrorRef, profileForm.email.error)
  useReactiveDOM(ageErrorRef, profileForm.age.error)
  useReactiveDOM(validRef, profileForm.isValid)

  return (
    <Card size="md" variant="accent">
      <div className="space-y-6">
        <Title as="h2">📋 Profile Form (Reactive)</Title>
        <RenderCount />

        <Input
          id="email"
          label="Email"
          value={profileForm.email.value.value}
          onChange={(v) => profileForm.email.set(v)}
          refValue={emailRef}
          refError={emailErrorRef}
        />

        <Input
          id="age"
          label="Age"
          type="number"
          value={profileForm.age.value.value.toString()}
          onChange={(v) => profileForm.age.set(parseInt(v))}
          refValue={ageRef}
          refError={ageErrorRef}
        />

        <p ref={validRef} className="text-gray-500" />

        <div className="flex gap-2 pt-4">
          <Button
            onClick={() => {
              profileForm.email.set('user@example.com')
              profileForm.age.set(25)
            }}
          >
            Autofill
          </Button>

          <Button variant="secondary" onClick={() => {
            profileForm.email.set('')
            profileForm.age.set(18)
          }}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  )
}
