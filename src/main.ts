/**
 * Entry point. Mounts the UI and upgrades the dashboard with the learner-home experience.
 */

import './style.css'
import { initApp } from './ui/ui'
import { enhanceDashboard } from './ui/dashboard-bootstrap'

initApp()
enhanceDashboard()
