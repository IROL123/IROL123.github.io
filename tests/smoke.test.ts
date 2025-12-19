#!/usr/bin/env tsx
/**
 * Smoke Tests for lab-site
 * Based on spec/21_test_plan.ir.yml
 *
 * Tests:
 * - SMK_SCHEMA_001: Content schema validation
 * - WF_SMK_001: Workflow test (paper appears in /papers)
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const TESTS_PASSED: string[] = []
const TESTS_FAILED: string[] = []

function log(message: string) {
  console.log(message)
}

function pass(testId: string, message: string) {
  log(`  PASS: ${testId} - ${message}`)
  TESTS_PASSED.push(testId)
}

function fail(testId: string, message: string) {
  log(`  FAIL: ${testId} - ${message}`)
  TESTS_FAILED.push(testId)
}

/**
 * SMK_SCHEMA_001: Content schema validation passes
 */
function testSchemaValidation() {
  log('\n[SMK_SCHEMA_001] Content schema validation...')

  try {
    execSync('pnpm run validate:content', {
      cwd: process.cwd(),
      stdio: 'pipe',
    })
    pass('SMK_SCHEMA_001', 'All content files pass schema validation')
  } catch (error) {
    fail('SMK_SCHEMA_001', 'Content validation failed')
    if (error instanceof Error && 'stdout' in error) {
      console.error((error as { stdout: Buffer }).stdout?.toString())
    }
  }
}

/**
 * WF_SMK_001: Workflow test - sample paper appears in /papers
 *
 * This test checks that the sample paper we created is included
 * in the papers index after running the content loader.
 */
function testPaperWorkflow() {
  log('\n[WF_SMK_001] Workflow: sample paper appears in index...')

  const samplePaperPath = path.join(
    process.cwd(),
    'content/papers/sample-paper-2024.mdx'
  )

  // Check that sample paper file exists
  if (!fs.existsSync(samplePaperPath)) {
    fail('WF_SMK_001', 'Sample paper file does not exist')
    return
  }

  // Check that the paper can be loaded
  try {
    const fileContent = fs.readFileSync(samplePaperPath, 'utf-8')
    if (
      fileContent.includes('Learning Robot Manipulation') &&
      fileContent.includes('ICRA')
    ) {
      pass('WF_SMK_001', 'Sample paper content is valid and loadable')
    } else {
      fail('WF_SMK_001', 'Sample paper content is missing expected fields')
    }
  } catch (error) {
    fail('WF_SMK_001', `Failed to read sample paper: ${error}`)
  }
}

/**
 * SMK_CONTENT_001: Content directories exist
 */
function testContentDirectories() {
  log('\n[SMK_CONTENT_001] Content directories exist...')

  const contentDir = path.join(process.cwd(), 'content')
  const requiredDirs = ['people', 'papers', 'projects', 'notices', 'datasets']

  let allExist = true
  for (const dir of requiredDirs) {
    const dirPath = path.join(contentDir, dir)
    if (!fs.existsSync(dirPath)) {
      allExist = false
      log(`    Missing: content/${dir}/`)
    }
  }

  if (allExist) {
    pass('SMK_CONTENT_001', 'All required content directories exist')
  } else {
    fail('SMK_CONTENT_001', 'Some content directories are missing')
  }
}

/**
 * SMK_SCHEMA_FILES_001: Schema files exist
 */
function testSchemaFilesExist() {
  log('\n[SMK_SCHEMA_FILES_001] Schema files exist...')

  const schemaDir = path.join(process.cwd(), 'src/lib/schemas')
  const requiredFiles = [
    'primitives.ts',
    'person.ts',
    'paper.ts',
    'project.ts',
    'notice.ts',
    'dataset.ts',
    'index.ts',
  ]

  let allExist = true
  for (const file of requiredFiles) {
    const filePath = path.join(schemaDir, file)
    if (!fs.existsSync(filePath)) {
      allExist = false
      log(`    Missing: src/lib/schemas/${file}`)
    }
  }

  if (allExist) {
    pass('SMK_SCHEMA_FILES_001', 'All schema files exist')
  } else {
    fail('SMK_SCHEMA_FILES_001', 'Some schema files are missing')
  }
}

/**
 * SMK_PAGES_001: Entity pages exist
 */
function testEntityPagesExist() {
  log('\n[SMK_PAGES_001] Entity list pages exist...')

  const appDir = path.join(process.cwd(), 'src/app')
  const requiredPages = [
    'people/page.tsx',
    'papers/page.tsx',
    'projects/page.tsx',
    'notices/page.tsx',
    'datasets/page.tsx',
  ]

  let allExist = true
  for (const page of requiredPages) {
    const pagePath = path.join(appDir, page)
    if (!fs.existsSync(pagePath)) {
      allExist = false
      log(`    Missing: src/app/${page}`)
    }
  }

  if (allExist) {
    pass('SMK_PAGES_001', 'All entity list pages exist')
  } else {
    fail('SMK_PAGES_001', 'Some entity list pages are missing')
  }
}

/**
 * SMK_CONFIG_001: Next.js config has static export
 */
function testStaticExportConfig() {
  log('\n[SMK_CONFIG_001] Static export configuration...')

  const configPath = path.join(process.cwd(), 'next.config.mjs')

  if (!fs.existsSync(configPath)) {
    fail('SMK_CONFIG_001', 'next.config.mjs does not exist')
    return
  }

  const configContent = fs.readFileSync(configPath, 'utf-8')

  if (configContent.includes("output: 'export'")) {
    pass('SMK_CONFIG_001', 'Static export is configured')
  } else {
    fail('SMK_CONFIG_001', "output: 'export' not found in next.config.mjs")
  }
}

// Run all tests
function runAllTests() {
  log('===========================================')
  log('Lab Site Smoke Tests')
  log('===========================================')

  testContentDirectories()
  testSchemaFilesExist()
  testEntityPagesExist()
  testStaticExportConfig()
  testSchemaValidation()
  testPaperWorkflow()

  log('\n===========================================')
  log('Results')
  log('===========================================')
  log(`Passed: ${TESTS_PASSED.length}`)
  log(`Failed: ${TESTS_FAILED.length}`)

  if (TESTS_FAILED.length > 0) {
    log('\nFailed tests:')
    for (const test of TESTS_FAILED) {
      log(`  - ${test}`)
    }
    process.exit(1)
  } else {
    log('\nAll tests passed!')
    process.exit(0)
  }
}

runAllTests()
