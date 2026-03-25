import { useState, useEffect } from 'react'
import { View, Text, ScrollView, Picker, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.scss'

type BillType = 'expense' | 'income'

interface Category {
  id: string
  name: string
  icon: string
}

const EXPENSE_CATEGORIES: Category[] = [
  { id: 'sys_exp_1', name: '餐饮', icon: '🍜' },
  { id: 'sys_exp_2', name: '交通', icon: '🚌' },
  { id: 'sys_exp_3', name: '购物', icon: '🛒' },
  { id: 'sys_exp_4', name: '居家', icon: '🏠' },
  { id: 'sys_exp_5', name: '娱乐', icon: '🎮' },
  { id: 'sys_exp_6', name: '医疗', icon: '💊' },
  { id: 'sys_exp_7', name: '教育', icon: '📚' },
  { id: 'sys_exp_8', name: '旅行', icon: '✈️' },
  { id: 'sys_exp_9', name: '数码', icon: '📱' },
  { id: 'sys_exp_10', name: '美容', icon: '💄' },
  { id: 'sys_exp_11', name: '服装', icon: '👔' },
  { id: 'sys_exp_12', name: '宠物', icon: '🐾' },
  { id: 'sys_exp_13', name: '水电煤', icon: '💡' },
  { id: 'sys_exp_14', name: '人情往来', icon: '💌' },
  { id: 'sys_exp_15', name: '其他支出', icon: '📦' },
]

const INCOME_CATEGORIES: Category[] = [
  { id: 'sys_inc_1', name: '工资', icon: '💰' },
  { id: 'sys_inc_2', name: '投资收益', icon: '📈' },
  { id: 'sys_inc_3', name: '收到红包', icon: '🎁' },
  { id: 'sys_inc_4', name: '奖金', icon: '🏆' },
  { id: 'sys_inc_5', name: '兼职收入', icon: '🔄' },
  { id: 'sys_inc_6', name: '其他收入', icon: '📦' },
]

function getTodayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function appendDigit(prev: string, digit: string): string {
  const hasDot = prev.includes('.')
  if (hasDot) {
    const decimals = prev.split('.')[1] ?? ''
    if (decimals.length >= 2) return prev
  } else {
    const intPart = prev === '' ? '0' : prev
    if (intPart.length >= 7) return prev
  }
  if (prev === '' || prev === '0') return digit
  return prev + digit
}

function appendDot(prev: string): string {
  if (prev.includes('.')) return prev
  if (prev === '') return '0.'
  return prev + '.'
}

function backspace(prev: string): string {
  if (prev.length <= 1) return ''
  return prev.slice(0, -1)
}

interface Props {
  visible: boolean
  onClose: () => void
}

export default function AddBillDrawer({ visible, onClose }: Props) {
  const [billType, setBillType] = useState<BillType>('expense')
  const [amountStr, setAmountStr] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [billDate, setBillDate] = useState(getTodayStr())
  const [note, setNote] = useState('')
  const [categoryPanelVisible, setCategoryPanelVisible] = useState(false)
  const [rendered, setRendered] = useState(visible)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (visible) {
      setRendered(true)
      setClosing(false)
      return
    }
    if (rendered) {
      setClosing(true)
      const timer = setTimeout(() => {
        setRendered(false)
        setClosing(false)
      }, 280)
      return () => clearTimeout(timer)
    }
    return
  }, [visible])

  const categories = billType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES
  const selectedCategory = categories.find((c) => c.id === categoryId)
  const isAmountValid = amountStr !== '' && amountStr !== '.' && parseFloat(amountStr) > 0

  const handleSwitchType = (type: BillType) => {
    setBillType(type)
    setCategoryId('')
    setCategoryPanelVisible(false)
  }

  const handleKeyPress = (key: string) => {
    switch (key) {
      case 'backspace':
        setAmountStr((prev) => backspace(prev))
        break
      case 'clear':
        setAmountStr('')
        break
      case '.':
        setAmountStr((prev) => appendDot(prev))
        break
      case 'confirm':
        handleSave()
        break
      default:
        setAmountStr((prev) => appendDigit(prev, key))
    }
  }

  const resetForm = () => {
    setBillType('expense')
    setAmountStr('')
    setCategoryId('')
    setBillDate(getTodayStr())
    setNote('')
    setCategoryPanelVisible(false)
  }

  const handleSave = () => {
    if (!isAmountValid) {
      Taro.showToast({ title: '请输入正确的金额', icon: 'none' })
      return
    }
    if (!categoryId) {
      Taro.showToast({ title: '请选择分类', icon: 'none' })
      return
    }
    const amountInCents = Math.round(parseFloat(amountStr) * 100)
    console.log('save bill', { billType, amountInCents, categoryId, billDate, note })
    Taro.showToast({ title: '已保存', icon: 'success' })
    setTimeout(() => {
      resetForm()
      onClose()
    }, 1000)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!rendered) return null

  return (
    <>
      {/* 遮罩 */}
      <View
        className={`${styles.overlay} ${closing ? styles.overlayClosing : ''}`}
        onClick={handleClose}
        catchMove
      />

      {/* 抽屉面板 */}
      <View className={`${styles.drawerPanel} ${closing ? styles.drawerPanelClosing : ''}`}>
        {/* 拖拽手柄 */}
        <View className={styles.handle} />

        {/* 可滚动表单区域 */}
        <ScrollView className={styles.scrollArea} scrollY style={{ height: '100%' }}>
          <View className={styles.scrollContent}>
            {/* 收支切换 */}
            <View className={styles.typeTabs}>
              <View
                className={`${styles.typeTab} ${billType === 'expense' ? styles.typeTabActive : ''}`}
                onClick={() => handleSwitchType('expense')}
              >
                支出
              </View>
              <View
                className={`${styles.typeTab} ${billType === 'income' ? styles.typeTabActive : ''}`}
                onClick={() => handleSwitchType('income')}
              >
                收入
              </View>
            </View>

            {/* 金额展示 */}
            <View className={styles.amountArea}>
              <Text className={styles.amountCurrency}>¥</Text>
              {amountStr === '' ? (
                <Text className={`${styles.amountValue} ${styles.amountPlaceholder}`}>0.00</Text>
              ) : (
                <Text className={styles.amountValue}>{amountStr}</Text>
              )}
              <View className={styles.amountCursor} />
            </View>

            {/* 表单字段 */}
            <View className={styles.form}>
              {/* 分类行 */}
              <View className={styles.formRow} onClick={() => setCategoryPanelVisible((v) => !v)}>
                <Text className={styles.formLabel}>分类</Text>
                <View className={styles.formValue}>
                  {selectedCategory ? (
                    <Text>
                      {selectedCategory.icon} {selectedCategory.name}
                    </Text>
                  ) : (
                    <Text className={styles.formValuePlaceholder}>请选择</Text>
                  )}
                  <Text
                    className={`${styles.formArrow} ${categoryPanelVisible ? styles.formArrowOpen : ''}`}
                  >
                    ›
                  </Text>
                </View>
              </View>

              {/* 分类内联展开面板 */}
              {categoryPanelVisible && (
                <View className={styles.categoryPanel}>
                  {categories.map((cat) => (
                    <View
                      key={cat.id}
                      className={`${styles.categoryItem} ${categoryId === cat.id ? styles.categoryItemActive : ''}`}
                      onClick={() => {
                        setCategoryId(cat.id)
                        setCategoryPanelVisible(false)
                      }}
                    >
                      <Text className={styles.categoryIcon}>{cat.icon}</Text>
                      <Text
                        className={`${styles.categoryName} ${categoryId === cat.id ? styles.categoryNameActive : ''}`}
                      >
                        {cat.name}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              {/* 日期行 */}
              <View className={styles.formRow}>
                <Text className={styles.formLabel}>日期</Text>
                <Picker
                  mode="date"
                  value={billDate}
                  end={getTodayStr()}
                  onChange={(e) => setBillDate(e.detail.value)}
                >
                  <View className={styles.formValue}>
                    <Text>{billDate}</Text>
                    <Text className={styles.formArrow}>›</Text>
                  </View>
                </Picker>
              </View>

              {/* 备注行 */}
              <View className={styles.formRow}>
                <Text className={styles.formLabel}>备注</Text>
                <Input
                  className={styles.noteInput}
                  value={note}
                  placeholder="选填，最多50字"
                  placeholderStyle="color:#ccc"
                  maxlength={50}
                  onInput={(e) => setNote(e.detail.value)}
                />
              </View>
            </View>

            {/* 保存按钮 */}
            <View
              className={`${styles.saveBtn} ${!isAmountValid || !categoryId ? styles.saveBtnDisabled : ''}`}
              onClick={handleSave}
            >
              <Text>保存</Text>
            </View>
          </View>
        </ScrollView>

        {/* 自定义数字键盘 */}
        <View className={styles.keyboard}>
          <View className={styles.keyboardRow}>
            {['1', '2', '3'].map((k) => (
              <View key={k} className={styles.key} onClick={() => handleKeyPress(k)}>
                <Text>{k}</Text>
              </View>
            ))}
            <View
              className={`${styles.key} ${styles.keyAction}`}
              onClick={() => handleKeyPress('backspace')}
            >
              <Text>←</Text>
            </View>
          </View>
          <View className={styles.keyboardRow}>
            {['4', '5', '6'].map((k) => (
              <View key={k} className={styles.key} onClick={() => handleKeyPress(k)}>
                <Text>{k}</Text>
              </View>
            ))}
            <View
              className={`${styles.key} ${styles.keyAction}`}
              onClick={() => handleKeyPress('clear')}
            >
              <Text>清空</Text>
            </View>
          </View>
          <View className={styles.keyboardRow}>
            {['7', '8', '9'].map((k) => (
              <View key={k} className={styles.key} onClick={() => handleKeyPress(k)}>
                <Text>{k}</Text>
              </View>
            ))}
            <View className={styles.key} onClick={() => handleKeyPress('.')}>
              <Text>.</Text>
            </View>
          </View>
          <View className={styles.keyboardRow}>
            <View className={`${styles.key} ${styles.keyEmpty}`} />
            <View className={styles.key} onClick={() => handleKeyPress('0')}>
              <Text>0</Text>
            </View>
            <View className={`${styles.key} ${styles.keyEmpty}`} />
            <View
              className={`${styles.key} ${styles.keyConfirm}`}
              onClick={() => handleKeyPress('confirm')}
            >
              <Text>确认</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  )
}
