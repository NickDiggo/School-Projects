// components/custom/memo-card.tsx
import type {FunctionComponent} from 'react'
import type {Memo} from '@/models/types'
import {Pressable, Text, View} from 'react-native'
import {useRouter} from 'expo-router'
import {Calendar, ImageIcon, Tag as TagIcon} from 'lucide-react-native'

interface MemoCardProps {
  memo: Memo
}

const MemoCard: FunctionComponent<MemoCardProps> = ({memo}) => {
  const router = useRouter()
  const tags = memo.tags ?? []
  const imageCount = memo.images?.length ?? 0
  const mapName = memo.map?.name

  return (
    <Pressable
      onPress={() => router.push(`/(authenticated)/memos/${memo.id}`)}
      className="border border-white rounded-2xl p-4 bg-black mb-3 active:opacity-70">
      {/* Header: title + map badge */}
      <View className="flex-row items-start justify-between gap-2 mb-3">
        <Text className="text-white text-base font-semibold flex-1" numberOfLines={1}>
          {memo.title}
        </Text>

        {mapName ? (
          <View className="border border-white/60 rounded-lg px-2 py-1 max-w-[140px]">
            <Text className="text-white text-xs font-medium" numberOfLines={1}>
              {mapName}
            </Text>
          </View>
        ) : null}
      </View>

      {/* Content */}
      {memo.content ? (
        <Text className="text-white/80 text-sm leading-5 mb-3" numberOfLines={2}>
          {memo.content}
        </Text>
      ) : null}

      {/* Tags */}
      {tags.length > 0 ? (
        <View className="flex-row flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <View
              key={tag.id}
              className="flex-row items-center gap-1 border border-white/60 rounded-full px-3 py-1">
              <TagIcon size={12} color="white" />
              <Text className="text-white text-xs">{tag.name}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-white/50 text-xs mb-3">Geen tags</Text>
      )}

      {/* Footer */}
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <Calendar size={12} color="white" />
          <Text className="text-white/70 text-xs">
            {new Date(memo.createdAt).toLocaleDateString('nl-NL')}
          </Text>
        </View>

        {imageCount > 0 ? (
          <View className="flex-row items-center gap-1">
            <ImageIcon size={12} color="white" />
            <Text className="text-white/70 text-xs">{imageCount}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  )
}

export default MemoCard
