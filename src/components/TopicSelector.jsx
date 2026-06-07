function TopicSelector({ activeTopicId, topics, onSelectTopic }) {
  const groups = topics.reduce((collection, topic) => {
    collection[topic.group] = collection[topic.group] ?? []
    collection[topic.group].push(topic)
    return collection
  }, {})

  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        Topics
      </h2>
      <div className="mt-4 space-y-5">
        {Object.entries(groups).map(([group, groupTopics]) => (
          <section key={group}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
              {group}
            </h3>
            <div className="mt-2 grid gap-2">
              {groupTopics.map((topic) => {
                const isActive = topic.id === activeTopicId

                return (
                  <button
                    className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                      isActive
                        ? 'border-cyan-300/50 bg-cyan-300/10 text-white'
                        : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.07]'
                    }`}
                    key={topic.id}
                    onClick={() => onSelectTopic(topic.id)}
                    type="button"
                  >
                    {topic.name}
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </aside>
  )
}

export default TopicSelector
