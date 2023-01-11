import React from 'react'
import styles from './Loading.module.css'

export default function Loading () {
  return (
    <div className={styles.spinner}>
      <div className={styles.doubleBounce1} />
      <div className={styles.doubleBounce2} />
    </div>
  )
}
