const e=`# Jaeger configuration file

#
# Reporter configuration
#
reporter:
  # The address of the Jaeger agent
  localAgentHostPort: "localhost:6831"
  # How often the reporter sends traces to the agent
  logSpans: true
  # The queue size for the reporter
  queueSize: 100
  # The interval at which the reporter flushes the queue
  flushInterval: 1s

#
# Sampler configuration
#
sampler:
  # The type of sampler to use
  type: "const"
  # The parameter for the sampler
  param: 1
`;export{e as default};
