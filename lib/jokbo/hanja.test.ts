import assert from 'node:assert/strict'
import { test } from 'node:test'
import { hasUnconverted, onlyHanja } from './hanja'

test('한자 키 변환 중인 한글은 미변환으로 인식', () => {
  assert.equal(hasUnconverted('相희'), true)
  assert.equal(hasUnconverted('相熙'), false)
  assert.equal(hasUnconverted(''), false)
})

test('칸을 벗어나면 한자만 남긴다', () => {
  assert.equal(onlyHanja('相희'), '相')
  assert.equal(onlyHanja('相 熙'), '相熙')
})
